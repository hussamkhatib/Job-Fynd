/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useRef } from "react";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
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
  const phoneNumberRef = useRef<HTMLInputElement>(null!);
  const parentsPhoneNumberRef = useRef<HTMLInputElement>(null!);
  const permanentAddressRef = useRef<HTMLInputElement>(null!);
  const currentAddressRef = useRef<HTMLInputElement>(null!);
  const pinCodeRef = useRef<HTMLInputElement>(null!);
  const bloodGroupRef = useRef<HTMLInputElement>(null!);
  const panCardNumberRef = useRef<HTMLInputElement>(null!);
  const voterIdRef = useRef<HTMLInputElement>(null!);

  const { isLoading, data, error } = useQuery(
    ["studentProfile", "?profile=full"],
    fetchStudentProfile,
    {
      select: (data) => data.studentRecord,
    }
  );
  const { mutate } = useMutation(
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
    const phoneNumber = phoneNumberRef.current.value;
    const parentsPhoneNumber = parentsPhoneNumberRef.current.value;
    const PermanentAddress = permanentAddressRef.current.value;
    const currentAddress = currentAddressRef.current.value;
    const pinCode = pinCodeRef.current.value;
    const bloodGroup = bloodGroupRef.current.value;
    const panCardNumber = panCardNumberRef.current.value;
    const voterId = voterIdRef.current.value;

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
    mutate(values);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <form onSubmit={updateRecordHandler} className="max-w-xl pt-4 mx-auto">
      <TextField
        id="phone number"
        label="Phone Number"
        name="phoneNumber"
        ref={phoneNumberRef}
        defaultValue={data?.phoneNumber}
      />
      <TextField
        id="parents phone number"
        label="Parents Phone Number"
        name="parentsPhoneNumber"
        ref={parentsPhoneNumberRef}
        defaultValue={data?.parentsPhoneNumber}
      />
      <TextField
        id="permanent address"
        label="Permanent Address"
        name="PermanentAddress"
        ref={permanentAddressRef}
        defaultValue={data?.PermanentAddress}
      />
      <TextField
        id="current address"
        label="Current Address"
        name="currentAddress"
        ref={currentAddressRef}
        defaultValue={data?.currentAddress}
      />
      <TextField
        id="pincode"
        label="Pin Code"
        name="pinCode"
        ref={pinCodeRef}
        defaultValue={data?.pinCode}
      />
      <TextField
        id="blood group"
        label="Blood Group"
        name="bloodGroup"
        ref={bloodGroupRef}
        defaultValue={data?.bloodGroup}
      />
      <TextField
        id="pan card Number"
        label="Pan Card Number"
        name="panCardNumber"
        ref={panCardNumberRef}
        defaultValue={data?.panCardNumber}
      />
      <TextField
        id="voter id"
        label="Voter Id"
        name="voterId"
        ref={voterIdRef}
        defaultValue={data?.voterId}
      />
      <ButtonGroup className="pt-4" align="end">
        <Button type="submit">Save Details</Button>
      </ButtonGroup>
    </form>
  );
};

const fetchStudentProfile = async () => {
  const { data } = await axios.get(`/api/me?profile=full`);
  return data;
};
