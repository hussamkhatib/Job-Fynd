import { ExternalLinkIcon, PencilIcon } from "@heroicons/react/solid";
import React, { FC, FormEvent, Fragment, useRef, useState } from "react";
import { toast } from "react-toastify";
import NavTabs from "../../../components/NavTabs";
import { profileTabs } from "../../../components/NavTabs/tabs";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import ListBox from "../../../components/ui/ListBox";
import Modal from "../../../components/ui/Modal";
import TextField from "../../../components/ui/TextField/TextField";
import { boards, scoreTypes } from "../../../store/student.data";
import FileUploader from "../../../components/FileUploader";
import { FileType } from "../../../components/FileUploader/FileUploader.types";
import { trpc } from "../../../utils/trpc";

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
  const { data, error, isLoading } = trpc.useQuery(["users.me"], {
    select: (data) => data?.details?.studentRecord ?? null,
  });

  return (
    <div className="max-w-xl mx-auto">
      {isLoading ? (
        <span>Loading...</span>
      ) : error instanceof Error ? (
        // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
        <span>Error</span>
      ) : (
        <>
          <EditSslc data={data} />
          <EditPuc data={data} />
          <EditDiploma data={data} />
          <EditGraduation data={data} />
        </>
      )}
    </div>
  );
};

const EditSslc = ({ data }: any) => {
  const utils = trpc.useContext();
  const [open, setOpen] = useState(false);
  const [sslcboard, setSslcboard] = useState(data?.sslcboard);
  const [sslcscoreType, setSslcscoreType] = useState(data?.sslcscoreType);
  const [sslcMarksSheetFileName, setSslcMarksSheetFileName] = useState<
    string | null
  >(null);
  const _sslcmarksSheet = useRef<FileType>(data.sslcmarksSheet);
  const _sslcscore = useRef<HTMLInputElement>(null!);

  const updateSslc = trpc.useMutation(["users.me.update.sslc"], {
    onSettled: (data, error) => {
      if (data) {
        toast.success("Profile Updated");
        utils.invalidateQueries(["users.me"]);
        setOpen(false);
      }
      if (error instanceof Error) toast.error(`Error: ${error.message}`);
    },
  });

  const updateSslcHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sslcscore = _sslcscore?.current?.value;
    const sslcmarksSheet = _sslcmarksSheet.current;
    updateSslc.mutate({
      sslcboard,
      sslcscoreType,
      sslcscore,
      sslcmarksSheet,
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
          <div className="flex-1 text-gray-700">{data?.sslcboard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score Type</div>
          <div className="flex-1 text-gray-700">{data?.sslcscoreType}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score</div>
          <div className="flex-1 text-gray-700">{data?.sslcscore}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Marks Sheet</div>
          <div className="flex-1 text-gray-700">
            {data?.sslcmarksSheet && (
              <a href={data?.sslcmarksSheet} rel="noreferrer" target="_blank">
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
            selected={sslcboard}
            setSelected={setSslcboard}
            list={boards}
          />
          <ListBox
            Label="Score Type"
            selected={sslcscoreType}
            setSelected={setSslcscoreType}
            list={scoreTypes}
          />
          <TextField
            ref={_sslcscore}
            defaultValue={data?.sslcscore}
            name="sslcscore"
            id="sslcscore"
            label="Score"
          />

          <div className="pt-4">
            <FileUploader
              accept={".pdf"}
              onChange={(file) => {
                setSslcMarksSheetFileName(file?.name ?? null);
                _sslcmarksSheet.current = file?.file;
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

const EditPuc = ({ data }: any) => {
  const utils = trpc.useContext();
  const [open, setOpen] = useState(false);
  const [pucboard, setPucBoard] = useState(data?.pucboard);
  const [pucscoreType, setPucscoreType] = useState(data?.scoreType);
  const _pucscore = useRef<HTMLInputElement>(null!);
  const [pucMarksSheetFileName, setPucMarksSheetFileName] = useState<
    string | null
  >(null);
  const _pucmarksSheet = useRef<FileType>(null);

  const updatePuc = trpc.useMutation(["users.me.update.puc"], {
    onSettled: (data, error) => {
      if (data) {
        toast.success("Profile Updated");
        utils.invalidateQueries(["users.me"]);
        setOpen(false);
      }
      if (error instanceof Error) toast.error(`Error: ${error.message}`);
    },
  });

  const updatePucHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pucscore = _pucscore?.current?.value;
    const pucmarksSheet = _pucmarksSheet.current;
    updatePuc.mutate({
      pucboard,
      pucscoreType,
      pucscore,
      pucmarksSheet,
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
          <div className="flex-1 text-gray-700">{data?.pucboard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score Type</div>
          <div className="flex-1 text-gray-700">{data?.pucscoreType}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score</div>
          <div className="flex-1 text-gray-700">{data?.pucscore}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Marks Sheet</div>
          <div className="flex-1 text-gray-700">
            {data?.pucmarksSheet && (
              <a href={data?.pucmarksSheet} rel="noreferrer" target="_blank">
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
            selected={pucboard}
            setSelected={setPucBoard}
            list={boards}
          />
          <ListBox
            Label="Score Type"
            selected={pucscoreType}
            setSelected={setPucscoreType}
            list={scoreTypes}
          />
          <TextField
            ref={_pucscore}
            defaultValue={data?.pucscore}
            name="score"
            id="score"
            label="Score"
          />
          <div className="pt-4">
            <FileUploader
              accept={".pdf"}
              onChange={(file) => {
                setPucMarksSheetFileName(file?.name ?? null);
                _pucmarksSheet.current = file?.file;
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

const EditDiploma = ({ data }: any) => {
  return (
    <section className="my-9">
      <h3 className="text-lg">Diploma</h3>
      <ViewEditSemester
        header="Sem 1"
        value={data?.diplomaSems1score}
        href={data?.diplomaSems1MarksSheet}
        keys={{
          name: "diplomaSems1score",
          file: "diplomaSems1MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 2"
        value={data?.diplomaSems2score}
        href={data?.diplomaSems2MarksSheet}
        keys={{
          name: "diplomaSems2score",
          file: "diplomaSems2MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 3"
        value={data?.diplomaSems3score}
        href={data?.diplomaSems3MarksSheet}
        keys={{
          name: "diplomaSems3score",
          file: "diplomaSems3MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 4"
        value={data?.diplomaSems4score}
        href={data?.diplomaSems4MarksSheet}
        keys={{
          name: "diplomaSems4score",
          file: "diplomaSems4MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 5"
        value={data?.diplomaSems5score}
        href={data?.diplomaSems5MarksSheet}
        keys={{
          name: "diplomaSems5score",
          file: "diplomaSems5MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 6"
        value={data?.diplomaSems6score}
        href={data?.diplomaSems6MarksSheet}
        keys={{
          name: "diplomaSems6score",
          file: "diplomaSems6MarksSheet",
        }}
      />
    </section>
  );
};

const EditGraduation = ({ data }: any) => {
  return (
    <section className="my-9">
      <h3 className="text-lg">Graduation</h3>
      <ViewEditSemester
        header="Sem 1"
        value={data?.graduationSem1score}
        href={data?.graduationSem1MarksSheet}
        keys={{
          name: "graduationSem1score",
          file: "graduationSem1MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 2"
        value={data?.graduationSem2score}
        href={data?.graduationSem2MarksSheet}
        keys={{
          name: "graduationSem2score",
          file: "graduationSem2MarksSheet",
        }}
      />

      <ViewEditSemester
        header="Sem 3"
        value={data?.graduationSem3score}
        href={data?.graduationSem3MarksSheet}
        keys={{
          name: "graduationSem3score",
          file: "graduationSem3MarksSheet",
        }}
      />

      <ViewEditSemester
        header="Sem 4"
        value={data?.graduationSem4score}
        href={data?.graduationSem4MarksSheet}
        keys={{
          name: "graduationSem4score",
          file: "graduationSem4MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 5"
        value={data?.graduationSem5score}
        href={data?.graduationSem5MarksSheet}
        keys={{
          name: "graduationSem5score",
          file: "graduationSem5MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 6"
        value={data?.graduationSem6score}
        href={data?.graduationSem6MarksSheet}
        keys={{
          name: "graduationSem6score",
          file: "graduationSem6MarksSheet",
        }}
      />
      <ViewEditSemester
        header="Sem 7"
        value={data?.graduationSem7score}
        href={data?.graduationSem7MarksSheet}
        keys={{
          name: "graduationSem7score",
          file: "graduationSem7MarksSheet",
        }}
      />

      <ViewEditSemester
        header="Sem 8"
        value={data?.graduationSem8score}
        href={data?.graduationSem8MarksSheet}
        keys={{
          name: "graduationSem8score",
          file: "graduationSem8MarksSheet",
        }}
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
  };
  header: string;
  value: string;
  href: string;
}
const ViewEditSemester: FC<Props> = ({ keys, header, value, href }) => {
  const utils = trpc.useContext();
  const [open, setOpen] = useState(false);
  const _inputText = useRef<HTMLInputElement>(null!);
  const _file = useRef<FileType>(href);
  const [fileName, setFileName] = useState<string | null>(null);

  const updateRecordHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputName = _inputText?.current?.value;
    updateRecord.mutate({
      [keys.name]: inputName,
      [keys.file]: _file.current,
    });
  };

  const updateRecord = trpc.useMutation(
    ["users.me.update.diplomaOrGraduation"],
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          utils.invalidateQueries(["users.me"]);
          setOpen(false);
        }
        if (error instanceof Error) toast.error("Error");
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
