import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import classNames from "classnames";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Input from "../../components/ui/Input";

const branches = ["CSE", "ISE", "ME"];

const Edit = () => {
  const [selected, setSelected] = useState(branches[1]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const usnRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <form>
        <div className="flex flex-col">
          <label htmlFor="name" className="">
            <span className="label-text">Name</span>
          </label>
          <Input type="text" id="name" ref={nameRef} required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="usn" className="">
            <span className="label-text">USN</span>
          </label>
          <Input type="text" id="usn" ref={usnRef} required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="">
            <span className="label-text">Email</span>
          </label>
          <Input type="text" id="email" ref={emailRef} required />
        </div>

        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Assigned to
              </Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <span className="block ml-3 truncate">{selected}</span>
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {branches.map((branch) => (
                      <Listbox.Option
                        key={branch}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-indigo-600"
                              : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-3 pr-9"
                          )
                        }
                        value={branch}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {branch}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </form>
    </div>
  );
};

export default Edit;
