import { ExternalLinkIcon } from "@heroicons/react/solid";
import { Opted } from "@prisma/client";
import { FC } from "react";
import Avatar from "../ui/Avatar";

interface Props {
  studentRecord: any;
}

const StudentProfile: FC<Props> = ({ studentRecord }) => {
  return (
    <div className="py-4 mx-auto text-sm">
      <Avatar
        size={80}
        src={studentRecord.image}
        alt="avatar"
        name={studentRecord.name}
      />
      <section className="my-9">
        <h3 className="text-lg">Personal Details</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Name</div>
          <div className="flex-1 text-gray-700">{studentRecord.name}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">USN</div>
          <div className="flex-1 text-gray-700">{studentRecord.usn}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Email</div>
          <div className="flex-1 text-gray-700">{studentRecord.email}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Branch</div>
          <div className="flex-1 text-gray-700">{studentRecord.branch}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Gender</div>
          <div className="flex-1 text-gray-700">{studentRecord.gender}</div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">Placement Details</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Interested in Placements</div>
          <div className="flex-1 text-gray-700">{studentRecord?.opted}</div>
        </div>
        {studentRecord?.opted === Opted.yes && (
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400">Offer Count</div>
            <div className="flex-1 text-gray-700">
              {studentRecord?._count?.offer}
            </div>
          </div>
        )}
      </section>
      <section className="my-9">
        <h3 className="text-lg">Record</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Validated</div>
          <div className="flex-1 text-gray-700">{studentRecord?.validated}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Resume</div>
          {studentRecord?.resume && (
            <a className="flex-1 text-gray-700" href={studentRecord.resume}>
              <ExternalLinkIcon className="w-5 h-5" aria-hidden />
            </a>
          )}
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Phone Number</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.phoneNumber}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Parents Phone Number</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.parentsPhoneNumber}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Permanent Address</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.PermanentAddress}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Current Address</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.currentAddress}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Pin Code</div>
          <div className="flex-1 text-gray-700">{studentRecord?.pinCode}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Blood Group</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.bloodGroup}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Pan Card Number</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.panCardNumber}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Voter Id</div>
          <div className="flex-1 text-gray-700">{studentRecord?.voterId}</div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Aadhar card</div>
          <div className="flex-1 text-gray-700">{studentRecord?.adharCard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">passportNumber</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.passportNumber}
          </div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">SSLC</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Board</div>
          <div className="flex-1 text-gray-700">{studentRecord.sslcboard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Score Type</div>
          <div className="flex-1 text-gray-700">
            {studentRecord.sslcscoreType}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Score</div>
          <div className="flex-1 text-gray-700">{studentRecord.sslcscore}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Marks Sheet</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.sslc?.url && (
              <a href={studentRecord.sslc?.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">PUC</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Board</div>
          <div className="flex-1 text-gray-700">{studentRecord.pucboard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Score Type</div>
          <div className="flex-1 text-gray-700">
            {studentRecord.pucscoreType}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Score</div>
          <div className="flex-1 text-gray-700">{studentRecord.pucscore}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Marks Sheet</div>
          <div className="flex-1 text-gray-700">
            {studentRecord?.puc?.url && (
              <a href={studentRecord.puc?.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">Diploma</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 1</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.diplomaSem1?.score && (
              <span className="mr-1">{studentRecord.diplomaSem1.score}</span>
            )}
            {studentRecord.diplomaSem1?.url && (
              <a href={studentRecord.diplomaSem1.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 2</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.diplomaSem2?.score && (
              <span className="mr-1">{studentRecord.diplomaSem2.score}</span>
            )}
            {studentRecord.diplomaSem2?.url && (
              <a href={studentRecord.diplomaSem2.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 3</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.diplomaSem3?.score && (
              <span className="mr-1">{studentRecord.diplomaSem3.score}</span>
            )}
            {studentRecord.diplomaSem3?.url && (
              <a href={studentRecord.diplomaSem3.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 4</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.diplomaSem4?.score && (
              <span className="mr-1">{studentRecord.diplomaSem4.score}</span>
            )}
            {studentRecord.diplomaSem4?.url && (
              <a href={studentRecord.diplomaSem4.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 5</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.diplomaSem5?.score && (
              <span className="mr-1">{studentRecord.diplomaSem5.score}</span>
            )}
            {studentRecord.diplomaSem5?.url && (
              <a href={studentRecord.diplomaSem5.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 6</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.diplomaSem6?.score && (
              <span className="mr-1">{studentRecord.diplomaSem6.score}</span>
            )}
            {studentRecord.diplomaSem6?.url && (
              <a href={studentRecord.diplomaSem6.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="my-9">
        <h3 className="text-lg">Graduation</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 1</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.graduationSem1?.score && (
              <span className="mr-1">{studentRecord.graduationSem1.score}</span>
            )}
            {studentRecord.graduationSem1?.score && (
              <span className="mr-1">{studentRecord.graduationSem1.score}</span>
            )}
            {studentRecord.graduationSem1?.url && (
              <a href={studentRecord.graduationSem1.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 2</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.graduationSem2?.score && (
              <span className="mr-1">{studentRecord.graduationSem2.score}</span>
            )}
            {studentRecord.graduationSem2?.url && (
              <a href={studentRecord.graduationSem2.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 3</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.graduationSem3?.score && (
              <span className="mr-1">{studentRecord.graduationSem3.score}</span>
            )}
            {studentRecord.graduationSem3?.url && (
              <a href={studentRecord.graduationSem3.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 4</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.graduationSem4?.score && (
              <span className="mr-1">{studentRecord.graduationSem4.score}</span>
            )}
            {studentRecord.graduationSem4?.url && (
              <a href={studentRecord.graduationSem4.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 5</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.graduationSem5?.score && (
              <span className="mr-1">{studentRecord.graduationSem5.score}</span>
            )}
            {studentRecord.graduationSem5?.url && (
              <a href={studentRecord.graduationSem5.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 6</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.graduationSem6?.score && (
              <span className="mr-1">{studentRecord.graduationSem6.score}</span>
            )}
            {studentRecord.graduationSem6?.url && (
              <a href={studentRecord.graduationSem6.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 7</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.graduationSem7?.score && (
              <span className="mr-1">{studentRecord.graduationSem7.score}</span>
            )}
            {studentRecord.graduationSem7?.url && (
              <a href={studentRecord.graduationSem7.url}>
                <ExternalLinkIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400">Sem 8</div>
          <div className="flex flex-1 text-gray-700">
            {studentRecord.graduationSem8?.score && (
              <span className="mr-1">{studentRecord.graduationSem8.score}</span>
            )}
            {studentRecord.graduationSem8?.url && (
              <a href={studentRecord.graduationSem8.url}>
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
