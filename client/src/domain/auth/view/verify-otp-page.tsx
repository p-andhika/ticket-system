import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

export const VerifyOtpPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Verifying OTP</EmptyTitle>
            <EmptyDescription>
              Please wait while we process your request. Do not refresh the
              page.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  );
};
