import { ExternalLinkIcon, PencilIcon } from "@heroicons/react/solid";
import axios, { AxiosError } from "axios";
import React, { FC, FormEvent, Fragment, useRef, useState } from "react";
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
import FileUploader from "../../../components/FileUploader";
import { FileType } from "../../../components/FileUploader/FileUploader.types";

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
  const [sslcMarksSheetFileName, setSslcMarksSheetFileName] = useState<
    string | null
  >(null);
  const _marksSheet = useRef<FileType>(null);

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
      marksSheet: _marksSheet.current,
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
              <a href={sslc?.marksSheet} rel="noreferrer" target="_blank">
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

          <div className="pt-4">
            <FileUploader
              accept={".pdf"}
              onChange={(file) => {
                setSslcMarksSheetFileName(file?.name ?? null);
                _marksSheet.current = file?.file;
              }}
              label="Select Marks Sheet"
              fileName={sslcMarksSheetFileName}
              id="offer-letter"
            />
          </div>
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
  const [pucMarksSheetFileName, setPucMarksSheetFileName] = useState<
    string | null
  >(null);
  const _marksSheet = useRef<FileType>(null);
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
      marksSheet: _marksSheet.current,
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
              <a href={puc?.marksSheet} rel="noreferrer" target="_blank">
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
          <div className="pt-4">
            <FileUploader
              accept={".pdf"}
              onChange={(file) => {
                setPucMarksSheetFileName(file?.name ?? null);
                _marksSheet.current = file?.file;
              }}
              label="Select Marks Sheet"
              fileName={pucMarksSheetFileName}
              id="offer-letter"
            />
          </div>
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
  return (
    <section className="my-9">
      <h3 className="text-lg">Diploma</h3>
      <ViewEditSemester
        header="Sem 1"
        value={diploma?.sem1}
        href={diploma?.sem1MarksSheet}
        keys={{ name: "sem1", file: "sem1MarksSheet", endpoint: "diploma" }}
      />
      <ViewEditSemester
        header="Sem 2"
        value={diploma?.sem2}
        href={diploma?.sem2MarksSheet}
        keys={{ name: "sem2", file: "sem2MarksSheet", endpoint: "diploma" }}
      />
      <ViewEditSemester
        header="Sem 3"
        value={diploma?.sem3}
        href={diploma?.sem3MarksSheet}
        keys={{ name: "sem3", file: "sem3MarksSheet", endpoint: "diploma" }}
      />
      <ViewEditSemester
        header="Sem 4"
        value={diploma?.sem4}
        href={diploma?.sem4MarksSheet}
        keys={{ name: "sem4", file: "sem4MarksSheet", endpoint: "diploma" }}
      />
      <ViewEditSemester
        header="Sem 5"
        value={diploma?.sem5}
        href={diploma?.sem5MarksSheet}
        keys={{ name: "sem5", file: "sem5MarksSheet", endpoint: "diploma" }}
      />
      <ViewEditSemester
        header="Sem 6"
        value={diploma?.sem6}
        href={diploma?.sem6MarksSheet}
        keys={{ name: "sem6", file: "sem6MarksSheet", endpoint: "diploma" }}
      />
    </section>
  );
};

const EditGraduation = ({ graduation }: any) => {
  return (
    <section className="my-9">
      <h3 className="text-lg">Graduation</h3>
      <ViewEditSemester
        header="Sem 1"
        value={graduation?.sem1}
        href={graduation?.sem1MarksSheet}
        keys={{ name: "sem1", file: "sem1MarksSheet", endpoint: "graduation" }}
      />
      <ViewEditSemester
        header="Sem 2"
        value={graduation?.sem2}
        href={graduation?.sem2MarksSheet}
        keys={{ name: "sem2", file: "sem2MarksSheet", endpoint: "graduation" }}
      />

      <ViewEditSemester
        header="Sem 3"
        value={graduation?.sem3}
        href={graduation?.sem3MarksSheet}
        keys={{ name: "sem3", file: "sem3MarksSheet", endpoint: "graduation" }}
      />

      <ViewEditSemester
        header="Sem 4"
        value={graduation?.sem4}
        href={graduation?.sem4MarksSheet}
        keys={{ name: "sem4", file: "sem4MarksSheet", endpoint: "graduation" }}
      />
      <ViewEditSemester
        header="Sem 5"
        value={graduation?.sem5}
        href={graduation?.sem5MarksSheet}
        keys={{ name: "sem5", file: "sem5MarksSheet", endpoint: "graduation" }}
      />
      <ViewEditSemester
        header="Sem 6"
        value={graduation?.sem6}
        href={graduation?.sem6MarksSheet}
        keys={{ name: "sem6", file: "sem6MarksSheet", endpoint: "graduation" }}
      />
      <ViewEditSemester
        header="Sem 7"
        value={graduation?.sem7}
        href={graduation?.sem7MarksSheet}
        keys={{ name: "sem7", file: "sem7MarksSheet", endpoint: "graduation" }}
      />

      <ViewEditSemester
        header="Sem 8"
        value={graduation?.sem8}
        href={graduation?.sem8MarksSheet}
        keys={{ name: "sem8", file: "sem8MarksSheet", endpoint: "graduation" }}
      />
    </section>
  );
};
// TODO:give this component more meaningful name
// It is used to read and write individual Semester marks + marksheet
interface Props {
  keys: {
    name: string;
    file: string;
    endpoint: string;
  };
  header: string;
  value: string;
  href: string;
}
const ViewEditSemester: FC<Props> = ({ keys, header, value, href }) => {
  const [open, setOpen] = useState(false);
  const _inputText = useRef<HTMLInputElement>(null!);
  const _file = useRef<FileType>(null);

  const queryClient = useQueryClient();
  const [fileName, setFileName] = useState<string | null>(null);

  const updateRecordHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputName = _inputText?.current?.value;
    updateRecord.mutate({
      [keys.name]: inputName,
      [keys.file]: _file.current,
    });
  };

  const updateRecord = useMutation(
    (values: any) => axios.patch(`/api/me/update/${keys.endpoint}`, values),
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

  return (
    <Fragment>
      <div className="grid space-x-2 items-center grid-cols-[8rem_1fr] my-2">
        <div className="text-gray-400">{header}</div>
        <div className="grid grid-cols-[4rem_max-content] items-center flex-1 text-gray-700">
          <div className="flex">
            {value}
            {href && (
              <a href={href} rel="noreferrer" target="_blank">
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
          <Button
            size="sm"
            color="minimal"
            StartIcon={PencilIcon}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      <Modal title={`Edit ${header}`} state={{ open, setOpen }}>
        <form onSubmit={updateRecordHandler}>
          <TextField
            ref={_inputText}
            defaultValue={value}
            name={keys.name}
            id={keys.name}
            label={header}
          />
          <div className="py-2">
            <FileUploader
              accept=".pdf"
              fileName={fileName}
              onChange={(file) => {
                setFileName(file?.name ?? null);
                _file.current = file?.file;
              }}
              id="marks-sheet"
              label="Select Marks Sheet"
            />
          </div>
          <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
            <Button
              color="primary"
              type="submit"
              loading={updateRecord.isLoading}
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
