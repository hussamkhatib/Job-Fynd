import { FC, Fragment } from "react";
import Loader from "../ui/Loader";
import { trpc } from "../../utils/trpc";
import { branches } from "../../store/student.data";

import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { BarGroup } from "@visx/shape";
import { GridRows } from "@visx/grid";
import { LegendOrdinal } from "@visx/legend";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import Alert from "../ui/Alert";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Branch } from "@prisma/client";

const BranchWiseOffers = () => {
  const { isLoading, data, error } = trpc.useQuery(["admin.branch.offers"]);

  return (
    <section className="max-w-5xl py-10 mx-auto">
      <h2 className="py-4 text-3xl font-semibold text-center">
        Branch Wise Offers
      </h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert>{error.message}</Alert>
      ) : data ? (
        <ParentSize>
          {({ width, height }) => (
            <BarChartGroup data={data} width={width} height={height} />
          )}
        </ParentSize>
      ) : null}
    </section>
  );
};

export default BranchWiseOffers;

type Props = {
  data: any[];
  width: number;
  height: number;
};

interface TooltipData {
  key: string;
  value: number;
}
interface TransformedData {
  branch: Branch;
  unique_offer: number;
  multiple_offer: number;
}
// Defining selector functions
const getBranch = (d: TransformedData) => d.branch;

const keys = ["unique_offer", "multiple_offer"];

const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: ["#5753F3", "#ADC0E2"],
});

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

let tooltipTimeout: number;

const BarChartGroup: FC<Props> = ({ data, width, height }) => {
  // define margins from where to start drawing the chart
  const margin = { top: 40, right: 40, bottom: 50, left: 40 };
  // defining inner measurements
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // mapped Data for easy access of values using branch as key
  const MapData = new Map(data.map((obj) => [obj.branch, obj]));

  // The sql query does not return the branches in which there is no offer,
  // This func will make sure that the branches with no offer are also displayed.
  const transformedData: TransformedData[] = branches.map((branch) => {
    return {
      branch,
      unique_offer: MapData.get(branch) ? MapData.get(branch).unique_offer : 0,
      multiple_offer: MapData.get(branch)
        ? MapData.get(branch).multiple_offer
        : 0,
    };
  });
  // horizontal, x scale
  const branchScale = scaleBand<string>({
    domain: transformedData.map(getBranch),
    range: [0, innerWidth],
    padding: 0.2,
  });

  const offerScale = scaleBand<string>({
    domain: keys,
    range: [0, branchScale.bandwidth()],
    padding: 0.1,
  });

  // unique_offer is always >= multiple offer
  const maxUniqueOffersByABranch = data.reduce(
    (prev, current) =>
      current.unique_offer > prev ? current.unique_offer : prev,
    0
  );
  const offerCountScale = scaleLinear({
    domain: [0, maxUniqueOffersByABranch],
    range: [innerHeight, 0],
  });

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });
  return (
    <div className="relative bg-white h-[300px] md:h-[450px] lg:h-[600px] max-w-full">
      <div className="w-full flex justify-center">
        <LegendOrdinal scale={colorScale} direction="row" itemMargin={12} />
      </div>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#fff" rx={14} />

        <Group left={margin.left} top={margin.top}>
          <AxisLeft
            numTicks={4}
            stroke={"#EDF2F7"}
            tickStroke={"#EDF2F7"}
            scale={offerCountScale}
            hideZero
            // tickLength={15}
            tickLabelProps={() => ({
              fill: "black",
              fontSize: 11,
              textAnchor: "end",
            })}
          />
          <GridRows
            numTicks={4}
            scale={offerCountScale}
            width={innerWidth}
            height={innerHeight}
            stroke="#EDF2F7"
            // strokeOpacity={0.2}
          />
          <BarGroup
            data={transformedData}
            keys={keys}
            height={innerHeight}
            x0={getBranch}
            x0Scale={branchScale}
            color={colorScale}
            x1Scale={offerScale}
            yScale={offerCountScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup, i) => {
                // console.log(barGroup);
                return (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => {
                      const handleToolTip = (event: any) => {
                        if (tooltipTimeout) clearTimeout(tooltipTimeout);
                        // TooltipInPortal expects coordinates to be relative to containerRef
                        // localPoint returns coordinates relative to the nearest SVG, which
                        // is what containerRef is set to in this example.
                        const eventSvgCoords = localPoint(event);
                        const left = barGroup["x0"] + bar.x + bar.width / 2;
                        const tooltipData = {
                          key: bar.key,
                          value: bar.value,
                        };
                        showTooltip({
                          tooltipData,
                          tooltipTop: eventSvgCoords?.y,
                          tooltipLeft: left,
                        });
                      };
                      return (
                        <Fragment
                          key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        >
                          <rect
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                            textAnchor="middle"
                            rx={4}
                            onMouseLeave={() => {
                              tooltipTimeout = window.setTimeout(() => {
                                hideTooltip();
                              }, 300);
                            }}
                            onTouchStart={handleToolTip}
                            onTouchMove={handleToolTip}
                            onMouseMove={handleToolTip}
                          />
                          {/* FIXME:@link: https://github.com/hussamkhatib/Job-Fynd/issues/44 */}
                          <Text
                            x={bar.x + bar.width / 2 - 5}
                            y={bar.y - 3}
                            fontSize={12}
                            textAnchor="middle"
                            fill="black"
                          >
                            {bar.value}
                          </Text>
                        </Fragment>
                      );
                    })}
                  </Group>
                );
              })
            }
          </BarGroup>
        </Group>

        <AxisBottom
          top={innerHeight + margin.top}
          left={margin.left}
          scale={branchScale}
          stroke={"#EDF2F7"}
          // hideAxisLine
          tickStroke={"#EDF2F7"}
          tickLabelProps={() => ({
            fill: "black",
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>
              {tooltipData.key} {tooltipData.value}
            </strong>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
};
