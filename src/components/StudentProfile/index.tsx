import { ExternalLinkIcon } from "@heroicons/react/solid";
import { Opted } from "@prisma/client";
import { FC } from "react";
import Avatar from "../ui/Avatar";

interface Props {
  details: any;
}

const StudentProfile: FC<Props> = ({ details }) => {
  return (
    <div className="py-4 mx-auto text-sm">
      <Avatar size={80} src={details.image} alt="avatar" name={details.name} />
      <section className="my-9">
        <h3 className="text-lg">Personal Details</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Name</div>
          <div className="flex-1 text-gray-700">{details.name}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">USN</div>
          <div className="flex-1 text-gray-700">{details.usn}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Email</div>
          <div className="flex-1 text-gray-700">{details.email}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Branch</div>
          <div className="flex-1 text-gray-700">{details.branch}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Gender</div>
          <div className="flex-1 text-gray-700">{details.gender}</div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">Placement Details</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Interested in Placements</div>
          <div className="flex-1 text-gray-700">{details?.opted}</div>
        </div>
        {details?.opted === Opted.yes && (
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Offer Count</div>
            <div className="flex-1 text-gray-700">{details?._count?.offer}</div>
          </div>
        )}
      </section>
      <section className="my-9">
        <h3 className="text-lg">Record</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Resume</div>
          {details?.resume && (
            <a className="flex-1 text-gray-700" href={details.resume}>
              <ExternalLinkIcon className="w-5 h-5" aria-hidden />
            </a>
          )}
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Phone Number</div>
          <div className="flex-1 text-gray-700">{details?.phoneNumber}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Parents Phone Number</div>
          <div className="flex-1 text-gray-700">
            {details?.parentsPhoneNumber}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Permanent Address</div>
          <div className="flex-1 text-gray-700">
            {details?.PermanentAddress}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Current Address</div>
          <div className="flex-1 text-gray-700">{details?.currentAddress}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Pin Code</div>
          <div className="flex-1 text-gray-700">{details?.pinCode}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Blood Group</div>
          <div className="flex-1 text-gray-700">{details?.bloodGroup}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Pan Card Number</div>
          <div className="flex-1 text-gray-700">{details?.panCardNumber}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Voter Id</div>
          <div className="flex-1 text-gray-700">{details?.voterId}</div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Aadhar card</div>
          <div className="flex-1 text-gray-700">{details?.adharCard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">passportNumber</div>
          <div className="flex-1 text-gray-700">{details?.passportNumber}</div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">SSLC</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Board</div>
          <div className="flex-1 text-gray-700">{details.sslcboard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score Type</div>
          <div className="flex-1 text-gray-700">{details.sslcscoreType}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score</div>
          <div className="flex-1 text-gray-700">{details.sslcscore}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Marks Sheet</div>
          <div className="flex-1 text-gray-700">
            {details?.sslcmarksSheet && (
              <a href={details.sslcmarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">PUC</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Board</div>
          <div className="flex-1 text-gray-700">{details.pucboard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score Type</div>
          <div className="flex-1 text-gray-700">{details.sslcscoreType}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Score</div>
          <div className="flex-1 text-gray-700">{details.pucscore}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Marks Sheet</div>
          <div className="flex-1 text-gray-700">
            {details?.pucmarksSheet && (
              <a href={details.pucmarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">Diploma</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 1</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.diplomaSems1score}</span>
            {details.diplomaSems1MarksSheet && (
              <a href={details.diplomaSems1MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 2</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.diplomaSems2score}</span>
            {details.diplomaSems2MarksSheet && (
              <a href={details.diplomaSems2MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 3</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.diplomaSems3score}</span>
            {details.diplomaSems3MarksSheet && (
              <a href={details.diplomaSems3MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 4</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.diplomaSems4score}</span>
            {details.diplomaSems4MarksSheet && (
              <a href={details.diplomaSems4MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 5</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.diplomaSems5score}</span>
            {details.diplomaSems5MarksSheet && (
              <a href={details.diplomaSems5MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 6</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.diplomaSems6score}</span>
            {details.diplomaSems6MarksSheet && (
              <a href={details.diplomaSems6MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">Graduation</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 1</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.graduationSem1score}</span>
            {details.graduationSem1MarksSheet && (
              <a href={details.graduationSem1MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 2</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.graduationSem2score}</span>
            {details.graduationSem2MarksSheet && (
              <a href={details.graduationSem2MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 3</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.graduationSem3score}</span>
            {details.graduationSem3MarksSheet && (
              <a href={details.graduationSem3MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 4</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.graduationSem4score}</span>
            {details.graduationSem4MarksSheet && (
              <a href={details.graduationSem4MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 5</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.graduationSem5score}</span>
            {details.graduationSem5MarksSheet && (
              <a href={details.graduationSem5MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 6</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.graduationSem6score}</span>
            {details.graduationSem6MarksSheet && (
              <a href={details.graduationSem6MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 7</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.graduationSem7score}</span>
            {details.graduationSem7MarksSheet && (
              <a href={details.graduationSem7MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Sem 8</div>
          <div className="flex flex-1 text-gray-700">
            <span className="mr-1">{details.graduationSem8score}</span>
            {details.graduationSem8MarksSheet && (
              <a href={details.graduationSem8MarksSheet}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;
