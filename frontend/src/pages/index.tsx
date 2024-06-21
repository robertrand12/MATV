import LayoutVisitor from "@/layouts/layout-visitor";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ModalInitializePassword from "@/components/modal-initialize-password";
import ModalResetPassword from "@/components/modal-reset-password";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const passwordToken = router.query.passwordToken as string;
  const [isInitializePasswordOpen, setIsInitializePasswordOpen] = useState(false);
  const requestResetPassword = router.query.resetPassword as string;
  const resetPasswordToken = router.query.resetPasswordToken as string;
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isRequest, setIsRequest] = useState(false);

  useEffect(() => {
    if (passwordToken) {
      setIsInitializePasswordOpen(true);
    }
  }, [passwordToken]);

  useEffect(() => {
    if (requestResetPassword === "true") {
      setIsOpen(false);
      setIsRequest(true);
      setIsResetPasswordOpen(true);
    }
  }, [requestResetPassword]);

  useEffect(() => {
    if (resetPasswordToken) {
      setIsOpen(false);
      setIsRequest(false);
      setIsResetPasswordOpen(true);
    }
  }, [resetPasswordToken]);

  return (
    <LayoutVisitor isOpen={isOpen} setIsOpen={setIsOpen}>
      <section>
      <div className="px-4 pt-48 sm:px-6 flex flex-col lg:justify-center h-screen items-center lg:px-8 lg:pt-10">
          <h2 className="text-2xl font-medium text-reef sm:text-4xl text-center">
            Musique à tout va
          </h2>
        </div>
      </section>
      <ModalInitializePassword
        isOpen={isInitializePasswordOpen}
        setIsOpen={setIsInitializePasswordOpen}
        token={passwordToken}
      />
      <ModalResetPassword
        isOpen={isResetPasswordOpen}
        setIsOpen={setIsResetPasswordOpen}
        isRequest={isRequest}
        token={resetPasswordToken}
      />
    </LayoutVisitor>
  );
}
