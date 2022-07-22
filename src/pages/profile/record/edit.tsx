import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useRef } from "react";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import AxiosErrorMsg from "../../../components/AxiosErrorMsg";
import NavTabs from "../../../components/NavTabs";
import { profileTabs } from "../../../components/NavTabs/tabs";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import TextField from "../../../components/ui/TextField/TextField";

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

  const { isLoading, data, error } = useQuery(
    ["studentProfile", "?profile=full"],
    fetchStudentProfile,
    {
      select: (data) => data.studentRecord,
    }
  );
  const updateRecord = useMutation(
    (values: any) => axios.patch(`/api/me/update/record`, values),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          router.push("/profile/overview");
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );

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
        <span>Loading...</span>
      ) : error instanceof Error ? (
        <AxiosErrorMsg error={error as AxiosError} />
      ) : (
        <form onSubmit={updateRecordHandler}>
          <TextField
            id="phone number"
            label="Phone Number"
            name="phoneNumber"
            ref={_phoneNumber}
            defaultValue={data?.phoneNumber}
          />
          <TextField
            id="parents phone number"
            label="Parents Phone Number"
            name="parentsPhoneNumber"
            ref={_parentsPhoneNumber}
            defaultValue={data?.parentsPhoneNumber}
          />
          <TextField
            id="permanent address"
            label="Permanent Address"
            name="PermanentAddress"
            ref={_permanentAddress}
            defaultValue={data?.PermanentAddress}
          />
          <TextField
            id="current address"
            label="Current Address"
            name="currentAddress"
            ref={_currentAddress}
            defaultValue={data?.currentAddress}
          />
          <TextField
            id="pincode"
            label="Pin Code"
            name="pinCode"
            ref={_pinCode}
            defaultValue={data?.pinCode}
          />
          <TextField
            id="blood group"
            label="Blood Group"
            name="bloodGroup"
            ref={_bloodGroup}
            defaultValue={data?.bloodGroup}
          />
          <TextField
            id="pan card Number"
            label="Pan Card Number"
            name="panCardNumber"
            ref={_panCardNumber}
            defaultValue={data?.panCardNumber}
          />
          <TextField
            id="voter id"
            label="Voter Id"
            name="voterId"
            ref={_voterId}
            defaultValue={data?.voterId}
          />
          <ButtonGroup className="pt-4" align="end">
            <Button type="submit" loading={updateRecord.isLoading}>
              Save Details
            </Button>
          </ButtonGroup>
        </form>
      )}
    </div>
  );
};

const fetchStudentProfile = async () => {
  const { data } = await axios.get(`/api/me?profile=full`);
  return data;
};
