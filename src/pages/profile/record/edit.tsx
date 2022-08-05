import { useRouter } from "next/router";
import React, { FormEvent, useRef } from "react";
import { toast } from "react-toastify";
import NavTabs from "../../../components/NavTabs";
import { profileTabs } from "../../../components/NavTabs/tabs";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import Loader from "../../../components/ui/Loader";
import TextField from "../../../components/ui/TextField/TextField";
import { trpc } from "../../../utils/trpc";

const EditRecord = () => {
  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <RecordForm />
    </div>
  );
};

export default EditRecord;

const RecordForm = () => {
  const router = useRouter();
  const _phoneNumber = useRef<HTMLInputElement>(null!);
  const _parentsPhoneNumber = useRef<HTMLInputElement>(null!);
  const _permanentAddress = useRef<HTMLInputElement>(null!);
  const _currentAddress = useRef<HTMLInputElement>(null!);
  const _pinCode = useRef<HTMLInputElement>(null!);
  const _bloodGroup = useRef<HTMLInputElement>(null!);
  const _panCardNumber = useRef<HTMLInputElement>(null!);
  const _voterId = useRef<HTMLInputElement>(null!);

  const { data, error, isLoading } = trpc.useQuery(["users.me"], {
    select: (data) => data?.details?.studentRecord,
  });

  //TODO : logic duplicated code: ad846d77-9d98-46cf-ba08-47436ddcfed6
  const updateRecord = trpc.useMutation(["users.me.update.record"], {
    onSettled: (data, error) => {
      if (data) {
        toast.success("Profile Updated");
        router.push("/profile/overview");
      }
      if (error instanceof Error) toast.error(`Error: ${error.message}`);
    },
  });

  const updateRecordHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phoneNumber = _phoneNumber.current.value;
    const parentsPhoneNumber = _parentsPhoneNumber.current.value;
    const PermanentAddress = _permanentAddress.current.value;
    const currentAddress = _currentAddress.current.value;
    const pinCode = _pinCode.current.value;
    const bloodGroup = _bloodGroup.current.value;
    const panCardNumber = _panCardNumber.current.value;
    const voterId = _voterId.current.value;

    const values = {
      phoneNumber,
      parentsPhoneNumber,
      PermanentAddress,
      currentAddress,
      pinCode,
      bloodGroup,
      panCardNumber,
      voterId,
    };
    updateRecord.mutate(values);
  };

  return (
    <div className="max-w-xl pt-4 mx-auto">
      {isLoading ? (
        <Loader />
      ) : error instanceof Error ? (
        // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
        <span>Error</span>
      ) : (
        <form onSubmit={updateRecordHandler}>
          <TextField
            id="phone number"
            label="Phone Number"
            name="phoneNumber"
            ref={_phoneNumber}
            defaultValue={data?.phoneNumber ?? undefined}
          />
          <TextField
            id="parents phone number"
            label="Parents Phone Number"
            name="parentsPhoneNumber"
            ref={_parentsPhoneNumber}
            defaultValue={data?.parentsPhoneNumber ?? undefined}
          />
          <TextField
            id="permanent address"
            label="Permanent Address"
            name="PermanentAddress"
            ref={_permanentAddress}
            defaultValue={data?.PermanentAddress ?? undefined}
          />
          <TextField
            id="current address"
            label="Current Address"
            name="currentAddress"
            ref={_currentAddress}
            defaultValue={data?.currentAddress ?? undefined}
          />
          <TextField
            id="pincode"
            label="Pin Code"
            name="pinCode"
            ref={_pinCode}
            defaultValue={data?.pinCode ?? undefined}
          />
          <TextField
            id="blood group"
            label="Blood Group"
            name="bloodGroup"
            ref={_bloodGroup}
            defaultValue={data?.bloodGroup ?? undefined}
          />
          <TextField
            id="pan card Number"
            label="Pan Card Number"
            name="panCardNumber"
            ref={_panCardNumber}
            defaultValue={data?.panCardNumber ?? undefined}
          />
          <TextField
            id="voter id"
            label="Voter Id"
            name="voterId"
            ref={_voterId}
            defaultValue={data?.voterId ?? undefined}
          />
          <ButtonGroup className="pt-2" align="end">
            <Button type="submit" loading={updateRecord.isLoading}>
              Save Details
            </Button>
          </ButtonGroup>
        </form>
      )}
    </div>
  );
};
