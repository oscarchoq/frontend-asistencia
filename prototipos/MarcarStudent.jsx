import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Label } from "recharts";

const MarcarStudent = () => {
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">Asistencia</h1>
      </div>
      <form className="space-y-6">
        <InputOTP maxLength={6} className="items-center flex justify-center">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <div className="text-sm">
          Por favor, ingrese el codigo de clase generada por su docente.
          <p className="flex items-center hover:underline cursor-pointer pt-2 text-slate-600">
            Prefiero scanear QR
          </p>
        </div>

        <Button type="submit">Marcar</Button>
      </form>
    </div>
  );
};

export default MarcarStudent;
