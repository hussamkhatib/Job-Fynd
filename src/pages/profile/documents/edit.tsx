import { ExternalLinkIcon, PencilIcon } from "@heroicons/react/solid";
import React, { FC, FormEvent, Fragment, useRef, useState } from "react";
import { toast } from "react-toastify";
import NavTabs from "../../../components/NavTabs";
import { profileTabs } from "../../../components/NavTabs/tabs";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import ListBox from "../../../components/ui/ListBox";
import Modal from "../../../components/ui/Modal";
import TextField from "../../../components/ui/TextField";
import { boards, scoreTypes } from "../../../store/student.data";
import FileUploader from "../../../components/FileUploader";
import { FileType } from "../../../components/FileUploader/FileUploader.types";
import { trpc } from "../../../utils/trpc";
import Loader from "../../../components/ui/Loader";
import Alert from "../../../components/ui/Alert";
import Error from "next/error";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

const EditDocument = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.admin) return <Error statusCode={403} />;

  return (
    <>
      <NavTabs tabs={profileTabs} />
      <DocumentsForm />
    </>
  );
};

export default EditDocument;

const DocumentsForm = () => {
  const { data, error, isLoading } = trpc.useQuery(["users.me"], {
    select: (data) => data?.studentRecord ?? null,
  });

  return (
    <div className="max-w-xl mx-auto">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert>{error.message}</Alert>
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
  const _sslcmarksSheet = useRef<FileType>(null);
  const [fileName, setFileName] = useState<string | null>(null);
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
    if (sslcmarksSheet)
      updateSslc.mutate({
        sslcboard,
        sslcscoreType,
        sslcscore,
        buffer: sslcmarksSheet,
        file: fileName,
      });
    else
      updateSslc.mutate({
        sslcboard,
        sslcscoreType,
        sslcscore,
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
            {data?.sslcmarksSheet?.url && (
              <a
                href={data?.sslcmarksSheet.url}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>
      <Modal
        title="SSLC"
        state={{ open, setOpen }}
        onClose={() => {
          _sslcscore.current = null!;
          _sslcmarksSheet.current = null;
          setFileName(null);
        }}
      >
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
              accept=".PDF"
              onChange={(file) => {
                setFileName(file?.name ?? null);
                _sslcmarksSheet.current = file?.file;
              }}
              href={data?.sslcmarksSheet?.url}
              label="Select Marks Sheet"
              fileName={fileName}
              id="offer-letter"
            />
          </div>
          <ButtonGroup className="px-4 py-1 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
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
              onClick={() => {
                setOpen(false);
                _sslcscore.current = null!;
                _sslcmarksSheet.current = null;
                setSslcboard(data?.sslcboard);
                setSslcscoreType(data?.sslcscoreType);
                setFileName(null);
              }}
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
  const [fileName, setFileName] = useState<string | null>(null);
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
    if (pucmarksSheet)
      updatePuc.mutate({
        pucboard,
        pucscoreType,
        pucscore,
        buffer: pucmarksSheet,
        file: fileName,
      });
    else
      updatePuc.mutate({
        pucboard,
        pucscoreType,
        pucscore,
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
            {data?.pucmarksSheet?.url && (
              <a
                href={data?.pucmarksSheet.url}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>
      <Modal
        title="SSLC"
        state={{ open, setOpen }}
        onClose={() => {
          _pucscore.current = null!;
          _pucmarksSheet.current = null;
          setPucBoard(data?.pucboard);
          setPucscoreType(data?.scoreType);
          setFileName(null);
        }}
      >
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
              accept=".PDF"
              onChange={(file) => {
                setFileName(file?.name ?? null);
                _pucmarksSheet.current = file?.file;
              }}
              href={data?.pucmarksSheet?.url}
              label="Select Marks Sheet"
              fileName={fileName}
              id="offer-letter"
            />
          </div>
          <ButtonGroup className="px-4 py-1 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
            <Button color="primary" type="submit" loading={updatePuc.isLoading}>
              Save Details
            </Button>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setOpen(false);
                _pucscore.current = null!;
                _pucmarksSheet.current = null;
                setPucBoard(data?.pucboard);
                setPucscoreType(data?.scoreType);
                setFileName(null);
              }}
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
        data={data?.diplomaSem1}
        field="diplomaSem1"
      />
      <ViewEditSemester
        header="Sem 2"
        data={data?.diplomaSem2}
        field="diplomaSem2"
      />
      <ViewEditSemester
        header="Sem 3"
        data={data?.diplomaSem3}
        field="diplomaSem3"
      />
      <ViewEditSemester
        header="Sem 4"
        data={data?.diplomaSem4}
        field="diplomaSem4"
      />
      <ViewEditSemester
        header="Sem 5"
        data={data?.diplomaSem5}
        field="diplomaSem5"
      />
      <ViewEditSemester
        header="Sem 6"
        data={data?.diplomaSem6}
        field="diplomaSem6"
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
        data={data?.graduationSem1}
        field="graduationSem1"
      />
      <ViewEditSemester
        header="Sem 2"
        data={data?.graduationSem2}
        field="graduationSem2"
      />

      <ViewEditSemester
        header="Sem 3"
        data={data?.graduationSem3}
        field="graduationSem3"
      />

      <ViewEditSemester
        header="Sem 4"
        data={data?.graduationSem4}
        field="graduationSem4"
      />
      <ViewEditSemester
        header="Sem 5"
        data={data?.graduationSem5}
        field="graduationSem5"
      />
      <ViewEditSemester
        header="Sem 6"
        data={data?.graduationSem6}
        field="graduationSem6"
      />
      <ViewEditSemester
        header="Sem 7"
        data={data?.graduationSem7}
        field="graduationSem7"
      />
      <ViewEditSemester
        header="Sem 8"
        data={data?.graduationSem8}
        field="graduationSem8"
      />
    </section>
  );
};
// TODO:give this component more meaningful name
// It is used to read and write individual Semester marks + marksheet
interface Props {
  header: string;
  field: string;
  data: any;
}
const ViewEditSemester: FC<Props> = ({ field, header, data }) => {
  const utils = trpc.useContext();
  const [open, setOpen] = useState(false);
  const _inputText = useRef<HTMLInputElement>(null!);
  const _file = useRef<FileType>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const updateRecordHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputName = _inputText?.current?.value;
    const file = _file.current;
    if (file)
      updateRecord.mutate({
        [field]: {
          score: inputName,
          file: fileName,
          buffer: file,
        },
      });
    // new file is not selected
    else
      updateRecord.mutate({
        [field]: {
          score: inputName,
        },
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
            {data?.score}
            {data?.url && (
              <a href={data.url} rel="noreferrer" target="_blank">
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
      <Modal
        title={`Edit ${header}`}
        state={{ open, setOpen }}
        onClose={() => {
          _inputText.current = null!;
          _file.current = null;
          setFileName(null);
        }}
      >
        <form onSubmit={updateRecordHandler}>
          <TextField
            ref={_inputText}
            defaultValue={data?.score}
            name={field}
            id={field}
            label={`${header} Score`}
          />
          <div className="py-2">
            <FileUploader
              accept=".PDF"
              onChange={(file) => {
                setFileName(file?.name ?? null);
                _file.current = file?.file;
              }}
              href={data?.url}
              id="marks-sheet"
              label={`${header} Marksheet`}
              fileName={fileName}
            />
          </div>
          <ButtonGroup className="px-4 py-1 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
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
              onClick={() => {
                setOpen(false);
                _inputText.current = null!;
                _file.current = null;
                setFileName(null);
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </Fragment>
  );
};
