import { ExternalLinkIcon, PencilIcon } from "@heroicons/react/solid";
import axios, { AxiosError } from "axios";
import React, { FormEvent, Fragment, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import NavTabs from "../../../components/NavTabs";
import { profileTabs } from "../../../components/NavTabs/tabs";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import ListBox from "../../../components/ui/ListBox";
import Modal from "../../../components/ui/Modal";
import TextField from "../../../components/ui/TextField/TextField";
import AxiosErrorMsg from "../../../components/AxiosErrorMsg";
import { boards, scoreTypes } from "../../../store/student.data";

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
      select: (data) => data?.studentRecord,
    }
  );
  console.log(data);
  return (
    <div className="max-w-xl mx-auto">
      {isLoading ? (
        <span>Loading...</span>
      ) : error instanceof Error ? (
        <AxiosErrorMsg error={error as AxiosError} />
      ) : data ? (
        <>
          <EditSslc sslc={data?.sslc} />
          <EditPuc puc={data?.puc} />
          <EditDiploma diploma={data?.diploma} />
          <EditGraduation graduation={data?.graduation} />
        </>
      ) : (
        <div>
          Complete your
          <Button
            className="underline"
            href="/profile/record/edit"
            size="sm"
            color="minimal"
          >
            record
          </Button>
          first
        </div>
      )}
    </div>
  );
};

const EditSslc = ({ sslc }: any) => {
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState(sslc?.board);
  const [scoreType, setScoreType] = useState(sslc?.scoreType);
  const _score = useRef<HTMLInputElement>(null!);
  const queryClient = useQueryClient();
  const updateSslc = useMutation(
    (values: any) => axios.patch(`/api/me/update/sslc`, values),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          queryClient.invalidateQueries(["studentProfile", "?profile=full"]);
          setOpen(false);
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );
  const updateSslcHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const score = _score?.current?.value;
    updateSslc.mutate({
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
            ref={_score}
            defaultValue={sslc?.score}
            name="score"
            id="score"
            label="Score"
          />
          <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
            <Button
              color="primary"
              type="submit"
              loading={updateSslc.isLoading}
            >
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
  const _score = useRef<HTMLInputElement>(null!);
  const queryClient = useQueryClient();

  const updatePuc = useMutation(
    (values: any) => axios.patch(`/api/me/update/puc`, values),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          queryClient.invalidateQueries(["studentProfile", "?profile=full"]);
          setOpen(false);
        }
        if (error instanceof Error)
          toast.error(<AxiosErrorMsg error={error as AxiosError} />);
      },
    }
  );
  const updatePucHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const score = _score?.current?.value;
    updatePuc.mutate({
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
            ref={_score}
            defaultValue={puc?.score}
            name="score"
            id="score"
            label="Score"
          />
          <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
            <Button color="primary" type="submit" loading={updatePuc.isLoading}>
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

const EditDiploma = ({ diploma }: any) => {
  const [open, setOpen] = useState(false);
  const _sem1 = useRef<HTMLInputElement>(null!);
  const _sem2 = useRef<HTMLInputElement>(null!);
  const _sem3 = useRef<HTMLInputElement>(null!);
  const _sem4 = useRef<HTMLInputElement>(null!);
  const _sem5 = useRef<HTMLInputElement>(null!);
  const _sem6 = useRef<HTMLInputElement>(null!);
  const queryClient = useQueryClient();

  const updateDiploma = useMutation(
    (values: any) => axios.patch(`/api/me/update/diploma`, values),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          queryClient.invalidateQueries(["studentProfile", "?profile=full"]);
          setOpen(false);
        }
        if (error instanceof Error)
          toast.error(<AxiosErrorMsg error={error as AxiosError} />);
      },
    }
  );
  const updateDiplomaHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sem1 = _sem1?.current?.value;
    const sem2 = _sem2?.current?.value;
    const sem3 = _sem3?.current?.value;
    const sem4 = _sem4?.current?.value;
    const sem5 = _sem5?.current?.value;
    const sem6 = _sem6?.current?.value;
    updateDiploma.mutate({
      sem1,
      sem2,
      sem3,
      sem4,
      sem5,
      sem6,
    });
  };

  return (
    <Fragment>
      <section className="my-9">
        <div className="grid space-x-2 grid-cols-[8rem_max-content] my-2 items-center">
          <h3 className="text-lg">Diploma</h3>
          <Button
            size="sm"
            color="minimal"
            StartIcon={PencilIcon}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 1</div>
          <div className="flex flex-1 text-gray-700">
            {diploma?.sem1}
            {diploma?.sem1MarksSheet && (
              <a href={diploma?.sem1MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 2</div>
          <div className="flex flex-1 text-gray-700">
            {diploma?.sem2}
            {diploma?.sem2MarksSheet && (
              <a href={diploma?.sem2MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 3</div>
          <div className="flex flex-1 text-gray-700">
            {diploma?.sem3}
            {diploma?.sem3MarksSheet && (
              <a href={diploma?.sem3MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 4</div>
          <div className="flex flex-1 text-gray-700">
            {diploma?.sem4}
            {diploma?.sem4MarksSheet && (
              <a href={diploma?.sem4MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 5</div>
          <div className="flex flex-1 text-gray-700">
            {diploma?.sem5}
            {diploma?.sem5MarksSheet && (
              <a href={diploma?.sem5MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 6</div>
          <div className="flex flex-1 text-gray-700">
            {diploma?.sem6}
            {diploma?.sem6MarksSheet && (
              <a href={diploma?.sem6MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>
      <Modal title="SSLC" state={{ open, setOpen }}>
        <form onSubmit={updateDiplomaHandler}>
          <TextField
            ref={_sem1}
            defaultValue={diploma?.sem1}
            name="sem1"
            id="sem1"
            label="Sem 1"
          />
          <TextField
            ref={_sem2}
            defaultValue={diploma?.sem2}
            name="sem2"
            id="sem2"
            label="Sem 2"
          />
          <TextField
            ref={_sem3}
            defaultValue={diploma?.sem3}
            name="sem3"
            id="sem3"
            label="Sem 3"
          />
          <TextField
            ref={_sem4}
            defaultValue={diploma?.sem4}
            name="sem4"
            id="sem4"
            label="Sem 4"
          />
          <TextField
            ref={_sem5}
            defaultValue={diploma?.sem5}
            name="sem5"
            id="sem5"
            label="Sem 5"
          />
          <TextField
            ref={_sem6}
            defaultValue={diploma?.sem6}
            name="sem6"
            id="sem6"
            label="Sem 6"
          />
          <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
            <Button
              color="primary"
              type="submit"
              loading={updateDiploma.isLoading}
            >
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

const EditGraduation = ({ graduation }: any) => {
  const [open, setOpen] = useState(false);
  const _sem1 = useRef<HTMLInputElement>(null!);
  const _sem2 = useRef<HTMLInputElement>(null!);
  const _sem3 = useRef<HTMLInputElement>(null!);
  const _sem4 = useRef<HTMLInputElement>(null!);
  const _sem5 = useRef<HTMLInputElement>(null!);
  const _sem6 = useRef<HTMLInputElement>(null!);
  const _sem7 = useRef<HTMLInputElement>(null!);
  const _sem8 = useRef<HTMLInputElement>(null!);
  const queryClient = useQueryClient();

  const updateGraduation = useMutation(
    (values: any) => axios.patch(`/api/me/update/graduation`, values),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          queryClient.invalidateQueries(["studentProfile", "?profile=full"]);
          setOpen(false);
        }
        if (error instanceof Error)
          toast.error(<AxiosErrorMsg error={error as AxiosError} />);
      },
    }
  );
  const updateGraduationHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sem1 = _sem1?.current?.value;
    const sem2 = _sem2?.current?.value;
    const sem3 = _sem3?.current?.value;
    const sem4 = _sem4?.current?.value;
    const sem5 = _sem5?.current?.value;
    const sem6 = _sem6?.current?.value;
    const sem7 = _sem6?.current?.value;
    const sem8 = _sem6?.current?.value;
    updateGraduation.mutate({
      sem1,
      sem2,
      sem3,
      sem4,
      sem5,
      sem6,
      sem7,
      sem8,
    });
  };

  return (
    <Fragment>
      <section className="my-9">
        <div className="grid space-x-2 grid-cols-[8rem_max-content] my-2 items-center">
          <h3 className="text-lg">Graduation</h3>
          <Button
            size="sm"
            color="minimal"
            StartIcon={PencilIcon}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 1</div>
          <div className="flex flex-1 text-gray-700">
            {graduation?.sem1}
            {graduation?.sem1MarksSheet && (
              <a href={graduation?.sem1MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 2</div>
          <div className="flex flex-1 text-gray-700">
            {graduation?.sem2}
            {graduation?.sem2MarksSheet && (
              <a href={graduation?.sem2MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 3</div>
          <div className="flex flex-1 text-gray-700">
            {graduation?.sem3}
            {graduation?.sem3MarksSheet && (
              <a href={graduation?.sem3MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 4</div>
          <div className="flex flex-1 text-gray-700">
            {graduation?.sem4}
            {graduation?.sem4MarksSheet && (
              <a href={graduation?.sem4MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 5</div>
          <div className="flex flex-1 text-gray-700">
            {graduation?.sem5}
            {graduation?.sem5MarksSheet && (
              <a href={graduation?.sem5MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 6</div>
          <div className="flex flex-1 text-gray-700">
            {graduation?.sem6}
            {graduation?.sem6MarksSheet && (
              <a href={graduation?.sem6MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 7</div>
          <div className="flex flex-1 text-gray-700">
            {graduation?.sem7}
            {graduation?.sem7MarksSheet && (
              <a href={graduation?.sem7MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">SEM 8</div>
          <div className="flex flex-1 text-gray-700">
            {graduation?.sem8}
            {graduation?.sem8MarksSheet && (
              <a href={graduation?.sem8MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>
      <Modal title="SSLC" state={{ open, setOpen }}>
        <form onSubmit={updateGraduationHandler}>
          <TextField
            ref={_sem1}
            defaultValue={graduation?.sem1}
            name="sem1"
            id="sem1"
            label="Sem 1"
          />
          <TextField
            ref={_sem2}
            defaultValue={graduation?.sem2}
            name="sem2"
            id="sem2"
            label="Sem 2"
          />
          <TextField
            ref={_sem3}
            defaultValue={graduation?.sem3}
            name="sem3"
            id="sem3"
            label="Sem 3"
          />
          <TextField
            ref={_sem4}
            defaultValue={graduation?.sem4}
            name="sem4"
            id="sem4"
            label="Sem 4"
          />
          <TextField
            ref={_sem5}
            defaultValue={graduation?.sem5}
            name="sem5"
            id="sem5"
            label="Sem 5"
          />
          <TextField
            ref={_sem6}
            defaultValue={graduation?.sem6}
            name="sem6"
            id="sem6"
            label="Sem 6"
          />
          <TextField
            ref={_sem7}
            defaultValue={graduation?.sem7}
            name="sem7"
            id="sem7"
            label="Sem 7"
          />
          <TextField
            ref={_sem8}
            defaultValue={graduation?.sem8}
            name="sem8"
            id="sem8"
            label="Sem 8"
          />
          <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
            <Button
              color="primary"
              type="submit"
              loading={updateGraduation.isLoading}
            >
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
