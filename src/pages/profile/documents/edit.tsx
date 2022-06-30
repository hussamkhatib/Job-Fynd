import { ExternalLinkIcon, PencilIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { FormEvent, Fragment, useRef, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import NavTabs from "../../../components/NavTabs";
import { profileTabs } from "../../../components/NavTabs/tabs";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import ListBox from "../../../components/ui/ListBox";
import Modal from "../../../components/ui/Modal";
import TextField from "../../../components/ui/TextField/TextField";
import { Board, ScoreType } from "@prisma/client";
const EditDocument = () => {
  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <DocumentsForm />
    </div>
  );
};

export default EditDocument;

const DocumentsForm = () => {
  const { isLoading, data, error } = useQuery(
    ["studentProfile", "?profile=full"],
    fetchStudentProfile,
    {
      select: (data) => {
        const {
          studentRecord: { sslc, puc, diploma, graduation },
        } = data;
        return {
          sslc,
          puc,
          diploma,
          graduation,
        };
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="max-w-xl mx-auto">
      <EditSslc sslc={data?.sslc} />
      <EditPuc puc={data?.puc} />
    </div>
  );
};

const boards = Object.values(Board);
const scoreTypes = Object.values(ScoreType);

const EditSslc = ({ sslc }: any) => {
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState(sslc?.board);
  const [scoreType, setScoreType] = useState(sslc?.scoreType);
  const scoreRef = useRef<HTMLInputElement>(null!);
  const { mutate, isLoading } = useMutation(
    (values: any) => axios.patch(`/api/me/update/sslc`, values),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          setOpen(false);
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );
  const updateSslcHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const score = scoreRef?.current?.value;
    mutate({
      board,
      scoreType,
      score,
    });
  };
  return (
    <Fragment>
      <section className="my-9">
        <div className="grid space-x-2 grid-cols-[8rem_max-content] my-2 items-center">
          <h3 className="text-lg">SSLC</h3>
          <Button
            size="sm"
            color="minimal"
            StartIcon={PencilIcon}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Board</div>
          <div className="flex-1 text-gray-700">{sslc?.board}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score Type</div>
          <div className="flex-1 text-gray-700">{sslc?.scoreType}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score</div>
          <div className="flex-1 text-gray-700">{sslc?.score}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Marks Sheet</div>
          <div className="flex-1 text-gray-700">
            {sslc?.marksSheet && (
              <a href={sslc?.marksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>
      <Modal title="SSLC" state={{ open, setOpen }}>
        <form onSubmit={updateSslcHandler}>
          <ListBox
            Label="Board"
            selected={board}
            setSelected={setBoard}
            list={boards}
          />
          <ListBox
            Label="Score Type"
            selected={scoreType}
            setSelected={setScoreType}
            list={scoreTypes}
          />
          <TextField
            ref={scoreRef}
            defaultValue={sslc?.score}
            name="score"
            id="score"
            label="Score"
          />
          <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
            <Button color="primary" type="submit" loading={isLoading}>
              Save Details
            </Button>
            <Button
              type="button"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </Fragment>
  );
};

const EditPuc = ({ puc }: any) => {
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState(puc?.board);
  const [scoreType, setScoreType] = useState(puc?.scoreType);
  const scoreRef = useRef<HTMLInputElement>(null!);
  const { mutate, isLoading } = useMutation(
    (values: any) => axios.patch(`/api/me/update/puc`, values),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          setOpen(false);
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );
  const updatePucHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const score = scoreRef?.current?.value;
    mutate({
      board,
      scoreType,
      score,
    });
  };
  return (
    <Fragment>
      <section className="my-9">
        <div className="grid space-x-2 grid-cols-[8rem_max-content] my-2 items-center">
          <h3 className="text-lg">PUC</h3>
          <Button
            size="sm"
            color="minimal"
            StartIcon={PencilIcon}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Board</div>
          <div className="flex-1 text-gray-700">{puc?.board}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score Type</div>
          <div className="flex-1 text-gray-700">{puc?.scoreType}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score</div>
          <div className="flex-1 text-gray-700">{puc?.score}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Marks Sheet</div>
          <div className="flex-1 text-gray-700">
            {puc?.marksSheet && (
              <a href={puc?.marksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>
      <Modal title="SSLC" state={{ open, setOpen }}>
        <form onSubmit={updatePucHandler}>
          <ListBox
            Label="Board"
            selected={board}
            setSelected={setBoard}
            list={boards}
          />
          <ListBox
            Label="Score Type"
            selected={scoreType}
            setSelected={setScoreType}
            list={scoreTypes}
          />
          <TextField
            ref={scoreRef}
            defaultValue={puc?.score}
            name="score"
            id="score"
            label="Score"
          />
          <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
            <Button color="primary" type="submit" loading={isLoading}>
              Save Details
            </Button>
            <Button
              type="button"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </Fragment>
  );
};

const fetchStudentProfile = async () => {
  const { data } = await axios.get(`/api/me?profile=full`);
  return data;
};
