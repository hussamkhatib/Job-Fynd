import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import Loader from "../components/ui/Loader";

import { trpc } from "../utils/trpc";

const Dashboard = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return null;
  return (
    <div>
      {/* <CompanyWiseOffers /> */}
      {/* <BranchWiseOffers /> */}
      {/* <PlacedNonPlacedRatioBranchWise /> */}
    </div>
  );
};

export default Dashboard;

const CompanyWiseOffers = () => {
  const { data, isLoading, error } = trpc.useQuery(["companies.get"]);

  return (
    <section className="max-w-5xl py-10 mx-auto">
      <h2 className="py-4 text-xl font-semibold">Company Wise Offers</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <span>erros</span>
      ) : data ? //   height={300} //   width={1000} // <BarChart
      //   data={data.results}
      //   margin={{
      //     top: 5,
      //     right: 30,
      //     left: 20,
      //     bottom: 5,
      //   }}
      // >
      //   <CartesianGrid strokeDasharray="3 3" />
      //   <XAxis dataKey="name" />
      //   <YAxis />
      //   <Tooltip />
      //   <Bar dataKey="offers" fill="#8884d8" />
      // </BarChart>
      null : null}
    </section>
  );
};

const BranchWiseOffers = () => {
  const { isLoading, data, error } = trpc.useQuery(["admin.branch.offers"]);
  return (
    <section className="max-w-5xl py-10 mx-auto">
      <h2 className="py-4 text-xl font-semibold">Branch Wise Offers</h2>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <span>error</span>
      ) : data ? //   width={500} // <BarChart
      //   height={300}
      //   data={data}
      //   margin={{
      //     top: 5,
      //     right: 30,
      //     left: 20,
      //     bottom: 5,
      //   }}
      // >
      //   <CartesianGrid strokeDasharray="3 3" />
      //   <XAxis dataKey="branch" />
      //   <YAxis />
      //   <Tooltip />
      //   <Legend />
      //   <Bar dataKey="unique_offer" fill="#8884d8" />
      //   <Bar dataKey="multiple_offer" fill="#82ca9d" />
      // </BarChart>
      null : null}
    </section>
  );
};

// const PlacedNonPlacedRatioBranchWise = () => {
//   const { isLoading, data, error } = useQuery(
//     "placedNonPlacedBranchWise",
//     fetchPlacedNonPlacedRatioBranchWise
//   );

//   const COLORS = ["#0088FE", "#00C49F"];
//   return (
//     <section className="max-w-5xl py-10 mx-auto">
//       <h2 className="py-4 text-xl font-semibold">
//         Placed/Non Placed Ratio Branch Wise
//       </h2>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <AxiosErrorMsg error={error as AxiosError} />
//       ) : (
//         <div className="grid items-baseline grid-cols-3 space-y-4 justify-items-center">
//           {branches?.map((branch) => {
//             const res = [
//               {
//                 name: "Placed",
//                 value: data[branch][0],
//               },
//               {
//                 name: "Non-Placed",
//                 value: data[branch][1],
//               },
//             ];
//             return (
//               <div key={branch}>
//                 <p className="text-lg font-bold text-center ">{branch}</p>
//                 <PieChart width={200} height={200}>
//                   <Pie
//                     data={res}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {res?.map((entry: any, index: any) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// };

// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }: any) => {
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
