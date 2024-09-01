"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

import { TechnicalErrorMessages } from "@/lib/MessagesEnum";
import { cn } from "@/lib/utils";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { toast } from "sonner";
import useUser from "@/hooks/use-user";
import Image from "next/image";
import { site_metadata } from "@/config/site_metadata";
import { BottomFooter } from "@/components/ui/BottomFooter";
import { fontHeading } from "@/config/myFont";
import { ThemeToggle } from "@/components/controls/theme-toggle";

interface IForm {
  reason?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Page() {
  const { user } = useUser();
  const [form, setForm] = useState<IForm>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.email || !form.reason || !form.subject || !form.message) {
        toast.error(
          "Please fill out all required fields: email, reason, subject, and message."
        );
        setLoading(false);
        return;
      }

      const response = await fetch("/api/users/contact_request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          reason: form.reason,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        toast.success("Your request has been submitted successfully!");
        setForm({});
      } else {
        const data = await response.json();
        setError(
          data.error || "Failed to submit the request. Please try again later."
        );
        toast.error(data.error || "Failed to submit the request.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="absolute hidden md:flex right-2 top-3  items-center gap-2 md:gap-3 md:right-4 md:top-4">
        <ThemeToggle />
      </nav>
      <section className="container mt-10 flex items-center justify-center gap-6 pb-20 pt-20 ">
        <div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h1
              className={cn(
                fontHeading.className,
                "header-heading  text-5xl leading-[1.1]",
                "font-extrabold -tracking-tight"
              )}
            >
              Contact Us
            </h1>
            <p className="max-w-[750px] text-center text-md text-default-500  ">
              You can contact us for any help, support, account recovery related
              requests or any business related discussions
            </p>
          </div>
          <div className="flex items-center  justify-center gap-4 pt-10  ">
            {success ? (
              <div className="flex flex-col items-center justify-center bg-background border p-6  pb-12 rounded-xl px-10 gap-3 pt-10 ">
                <CheckCircle className="h-10 w-10 text-green-500 " />
                <p className="text-md max-w-[500px] pt-2 text-center font-medium text-gray-500 ">
                  We received your request, our team is working on it, will get
                  back to you as soon as possible, in 1-3 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Select
                    size="md"
                    label="Select Reason"
                    required
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setForm((prev: IForm) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    className="w-full"
                  >
                    <SelectItem key={"Account"}>Account</SelectItem>
                    <SelectItem key={"Payment"}>Payment</SelectItem>
                    <SelectItem key={"Bugs"}>Bugs</SelectItem>
                    <SelectItem key={"Feedback"}>Feedback</SelectItem>
                    <SelectItem key={"Business"}>Business</SelectItem>
                    <SelectItem key={"Services"}>Services</SelectItem>
                    <SelectItem key={"Others"}>Others</SelectItem>
                    <SelectItem key={"Restore"}>Restore Account</SelectItem>
                  </Select>
                </div>
                <div className="mt-5 w-[75vw] lg:w-[500px] xl:w-[500px] 2xl:w-[500px]">
                  <Input
                    id="email"
                    label="Email"
                    onChange={(e) =>
                      setForm((prev: IForm) => ({
                        ...prev,
                        email: e.target?.value?.slice(0, 200),
                      }))
                    }
                    required
                    maxLength={200}
                    type="email"
                    className="mt-2"
                    placeholder="Your Email, for us to get back to you at"
                  />
                </div>
                <div className="mt-5 ">
                  <Input
                    id="subject"
                    className="mt-2"
                    label="Subject"
                    maxLength={500}
                    type="text"
                    onChange={(e) =>
                      setForm((prev: IForm) => ({
                        ...prev,
                        subject: e.target?.value?.slice(0, 500),
                      }))
                    }
                    required
                    placeholder="Reason for contacting in brief"
                  />
                </div>
                <div className="mt-5">
                  <Textarea
                    id="description"
                    label="Message"
                    required
                    rows={9}
                    maxLength={5000}
                    onChange={(e) =>
                      setForm((prev: IForm) => ({
                        ...prev,
                        message: e.target?.value,
                      }))
                    }
                    className=" resize-none  "
                    placeholder="Write your message in details, for the reason of contacting and including all the neccessary details required for us to help you"
                  />
                </div>
                <div className="mt-3 space-x-2 text-sm text-red-500">
                  {error}
                </div>
                <div className="mt-5 flex w-full justify-between space-x-2">
                  <Button variant="flat" type="reset">
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !form.reason}
                    isLoading={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2 h-5 w-5"
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                    Submit Ticket
                  </Button>
                </div>
              </form>
            )}
          </div>
          <div className=" w-full pt-20 flex justify-center">
            <p className="max-w-[750px] text-center text-sm text-default-500  ">
              You can also reach us out via email - test@ninetails.com. Normally
              your response should be expected in 1-2 business days, based on
              seriousness of the message.
            </p>
          </div>
          <BottomFooter className="mt-10" noLines />
        </div>
      </section>
    </>
  );
}
