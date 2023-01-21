import toastr from "toastr";

export function AlertSuccess(message: string) {
  toastr.success(message);
}

export function AlertError(message: string) {
  toastr.error(message);
}

export function AlertWarning(message: string) {
  toastr.warning(message);
}
