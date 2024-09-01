import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IPricingPlanDetails, PricingPlans } from "./priceConfig";
import { Button } from "@nextui-org/react";
import useUser from "@/hooks/use-user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TechnicalErrorMessages } from "@/lib/MessagesEnum";
import { toast } from "sonner";
import { User } from "next-auth";

type Props = {
  pricingDetails: IPricingPlanDetails;
};

export function PricingCard({ pricingDetails }: Props) {
  const { user, isLoggedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onClickUpgrade = async (user?: User, isLoggedIn?: boolean) => {
    switch (pricingDetails.plan_id) {
      case PricingPlans.PRO:
        try {
          if (user?.id && isLoggedIn) {
            setLoading(true);
            const redirectURLRes = await fetch(
              `/api/users/stripe?id=${user?.id}&plan_id=${pricingDetails.plan_id}&email=${user?.email}`,
              {
                method: "GET",
              }
            );

            let redirectURL = await redirectURLRes.text();
            window.location.href = redirectURL;
          } else {
            router.push("/login");
          }
        } catch (error) {
          toast.error(TechnicalErrorMessages.GENERAL_ERROR);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
        break;
      case PricingPlans.HOBBY:
        router.push("/");
        break;
      case PricingPlans.ENTERPRISE:
        router.push("/contact");
        break;
      default:
        break;
    }
  };

  return (
    <CardSpotlight className=" h-full w-full p-6 flex flex-col justify-between">
      {pricingDetails.popular && (
        <div className="absolute top-0 right-0 border bg-black dark:bg-white text-white dark:text-black  text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-md">
          Popular
        </div>
      )}
      <div>
        <p className="text-2xl font-bold relative z-20 mt-2 ">
          {pricingDetails.name}
        </p>
        <p className="text-default-500 mt-2 relative z-20 text-sm">
          {pricingDetails.description}
        </p>
        <p className="text-3xl font-bold  mt-4 relative z-20">
          {pricingDetails.price}
        </p>
        <div className="text-default-200 mt-6 relative z-20">
          <ul className="list-none space-y-2 flex flex-col gap-1">
            {pricingDetails.features.map((feature, index) => (
              <Step key={index} title={feature} />
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <Button
          className="w-full"
          isLoading={loading}
          variant="flat"
          onClick={() => onClickUpgrade(user, isLoggedIn)}
        >
          {pricingDetails.cta}
        </Button>
        {pricingDetails.secondaryCta && (
          <Button className="w-full" variant="solid">
            {pricingDetails.secondaryCta}
          </Button>
        )}
      </div>
    </CardSpotlight>
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className=" text-black dark:text-white ">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className=" text-gray-500 mr-1  "
      fill="none"
    >
      <path
        d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.0588 6.83333 22 5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
