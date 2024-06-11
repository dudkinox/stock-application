import TextInput from "../../common/TextInput";

interface ChangePasswordFormProps {
  setChangePassword: (value: string) => void;
  changePassword: string;
  changePasswordFunc: () => void;
}

export default function ChangePasswordForm({
  setChangePassword,
  changePassword,
  changePasswordFunc,
}: ChangePasswordFormProps) {
  return (
    <>
      <TextInput
        type="password"
        label=""
        value={changePassword}
        setValue={setChangePassword}
        icon={"fas fa-unlock-alt"}
        placeholder="กรอกรหัสผ่านที่ต้องการเปลี่ยน"
      />
      <button className="btn btn-success" onClick={changePasswordFunc}>
        save
      </button>
    </>
  );
}
