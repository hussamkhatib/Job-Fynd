import { ExternalLinkIcon } from "@heroicons/react/solid";
import { FC } from "react";
import Avatar from "../ui/Avatar";

interface Props {
  details: any;
}

const StudentProfile: FC<Props> = ({ details }) => {
  const { studentRecord: record } = details;
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
          <div className="flex-1 text-gray-700">{record?.opted}</div>
        </div>
      </section>
      <section className="my-9">
        <h3 className="text-lg">Record</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Resume</div>
          {record?.resume && (
            <a className="flex-1 text-gray-700" href={record.resume}>
              <ExternalLinkIcon className="w-5 h-5" aria-hidden />
            </a>
          )}
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Phone Number</div>
          <div className="flex-1 text-gray-700">{record?.phoneNumber}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Parents Phone Number</div>
          <div className="flex-1 text-gray-700">
            {record?.parentsPhoneNumber}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Permanent Address</div>
          <div className="flex-1 text-gray-700">{record?.PermanentAddress}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Current Address</div>
          <div className="flex-1 text-gray-700">{record?.currentAddress}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Pin Code</div>
          <div className="flex-1 text-gray-700">{record?.pinCode}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Blood Group</div>
          <div className="flex-1 text-gray-700">{record?.bloodGroup}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Pan Card Number</div>
          <div className="flex-1 text-gray-700">{record?.panCardNumber}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Voter Id</div>
          <div className="flex-1 text-gray-700">{record?.voterId}</div>
        </div>

        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Aadhar card</div>
          <div className="flex-1 text-gray-700">{record?.adharCard}</div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">passportNumber</div>
          <div className="flex-1 text-gray-700">{record?.passportNumber}</div>
        </div>
      </section>

      {record?.sslc && (
        <section className="my-9">
          <h3 className="text-lg">SSLC</h3>

          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Board</div>
            <div className="flex-1 text-gray-700">{record.sslc.board}</div>
          </div>
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Score Type</div>
            <div className="flex-1 text-gray-700">{record.sslc.scoreType}</div>
          </div>
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Score</div>
            <div className="flex-1 text-gray-700">{record.sslc.score}</div>
          </div>
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Marks Sheet</div>
            <div className="flex-1 text-gray-700">
              {record?.sslc?.marksSheet && (
                <a href={record.sslc.marksSheet}>
                  <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </section>
      )}
      {record?.puc && (
        <section className="my-9">
          <h3 className="text-lg">PUC</h3>
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Board</div>
            <div className="flex-1 text-gray-700">{record.puc.board}</div>
          </div>
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Score Type</div>
            <div className="flex-1 text-gray-700">{record.puc.scoreType}</div>
          </div>
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Score</div>
            <div className="flex-1 text-gray-700">{record.puc.score}</div>
          </div>
          <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
            <div className="text-gray-400 ">Marks Sheet</div>
            <div className="flex-1 text-gray-700">
              {record?.puc?.marksSheet && (
                <a href={record.puc.marksSheet}>
                  <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </section>
      )}
      {record?.diploma && (
        <section className="my-9">
          <h3 className="text-lg">Diploma</h3>
          {record.diploma?.sem1 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 1</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.diploma.sem1}</span>
                {record.diploma?.sem1MarksSheet && (
                  <a href={record.diploma.sem1MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.diploma?.sem2 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 2</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.diploma.sem2}</span>
                {record.diploma?.sem2MarksSheet && (
                  <a href={record.diploma.sem2MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.diploma?.sem3 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 3</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.diploma.sem3}</span>
                {record.diploma?.sem3MarksSheet && (
                  <a href={record.diploma.sem3MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.diploma?.sem4 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 4</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.diploma.sem4}</span>
                {record.diploma?.sem4MarksSheet && (
                  <a href={record.diploma.sem4MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.diploma?.sem5 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 5</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.diploma.sem5}</span>
                {record.diploma?.sem5MarksSheet && (
                  <a href={record.diploma.sem5MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.diploma?.sem6 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 6</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.diploma.sem6}</span>
                {record.diploma?.sem6MarksSheet && (
                  <a href={record.diploma.sem6MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}
        </section>
      )}
      {record?.graduation && (
        <section className="my-9">
          <h3 className="text-lg">Graduation</h3>
          {record.graduation?.sem1 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 1</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.graduation.sem1}</span>
                {record.graduation?.sem1MarksSheet && (
                  <a href={record.graduation.sem1MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.graduation?.sem2 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 2</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.graduation.sem2}</span>
                {record.graduation?.sem2MarksSheet && (
                  <a href={record.graduation.sem2MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.graduation?.sem3 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 3</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.graduation.sem3}</span>
                {record.graduation?.sem3MarksSheet && (
                  <a href={record.graduation.sem3MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.graduation?.sem4 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 4</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.graduation.sem4}</span>
                {record.graduation?.sem4MarksSheet && (
                  <a href={record.graduation.sem4MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.graduation?.sem5 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 5</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.graduation.sem5}</span>
                {record.graduation?.sem5MarksSheet && (
                  <a href={record.graduation.sem5MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.graduation?.sem6 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 6</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.graduation.sem6}</span>
                {record.graduation?.sem6MarksSheet && (
                  <a href={record.graduation.sem6MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.graduation?.sem7 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 7</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.graduation.sem7}</span>
                {record.graduation?.sem7MarksSheet && (
                  <a href={record.graduation.sem7MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          {record.graduation?.sem8 && (
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Sem 8</div>
              <div className="flex flex-1 text-gray-700">
                <span className="mr-1">{record.graduation.sem8}</span>
                {record.graduation?.sem8MarksSheet && (
                  <a href={record.graduation.sem8MarksSheet}>
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default StudentProfile;
