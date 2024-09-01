import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Avatar, Chip } from "@nextui-org/react";
import Image from "next/image";

const AccountSection = () => {
  const { user } = useUser();

  /**
   * Use This component to Edit Profile Details and Other Account related Information updates
   */

  return (
    <>
      <div className="  my-3 w-full flex relative justify-between p-4 items-center rounded-lg border-gray-200 dark:border-gray-800  ">
        <div className="flex flex-col gap-1">
          <Avatar
            className=" border-0 absolute top-3 right-3  cursor-pointer  "
            size={"md"}
            isBordered
            radius="sm"
            icon={
              <Image
                height={150}
                width={150}
                src={user?.image as string}
                alt={"avatar"}
                referrerPolicy="no-referrer"
                className=" border-0 cursor-pointer "
              />
            }
          />
          <p className="text-sm flex just">Email</p>
          <Chip
            className={cn(
              "my-2 bg-default/40   -tracking-tight w-[fit-content]  max-w-[60%] line-clamp-1 "
            )}
          >
            {user?.email}
          </Chip>
          <p className="text-tiny text-default-500 max-w-[100%]">
            Your Primary Email, used for communication regarding your account
            updates.
          </p>
        </div>
      </div>
      <div className=" border my-3 w-full flex flex-col p-4 rounded-lg border-gray-200 dark:border-gray-800  ">
        <p className="text-tiny text-default-600 max-w-[100%]">
          Add more Fields as per your Requirement
        </p>
      </div>
    </>
  );
};

export default AccountSection;
