type TValidates =  Record<string, (value: string) => {error: boolean, msg: string}>

export const validates:TValidates = {
  email(email: string) {
    const log = {error: false} as { error: boolean, msg: string };
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.length === 0) {
      log.error = true;
      log.msg = 'O email não pode estár vazio'
      return log;
    }

    if (!String(email).toLowerCase().match(regex)) {
      log.error = true;
      log.msg = "O email é invalido"
      return log;
    }

    return log;
  },
  password(password: string) {
    const log = {error: false} as { error: boolean, msg: string };
    if (password.length === 0) {
      log.error = true;
      log.msg = "A senha não pode estár vazio"
      return log;
    }

    if (password.length < 7) {
      log.error = true;
      log.msg = "A senha deve ter pelo menos 7 caracteres";
      return log;
    }

    if (password.length > 64) {
      log.error = true;
      log.msg = 'A senha deve ter no máximo 64 caracteres';
      return log;
    }

    return log;
  },
  username(username: string) {
    const log = {error: false} as { error: boolean, msg: string };
    const regex = /^(?=.*[a-zA-Z])\s*[a-zA-Z\s]*$/;

    if (username.length === 0) {
      log.error = true;
      log.msg = "O nome de usuário não pode estár vazio"
      return log
    }

    if (username.length < 7) {
      log.error = true;
      log.msg = "O nome de usuário deve ter pelo menos 7 caracteres"
      return log
    }

    if (username.length > 16) {
      log.error = true;
      log.msg = 'O nome de usuário deve ter no máximo 16 caracteres'
      return log
    }

    if (!regex.test(username)) {
      log.error = true;
      log.msg = "O nome de usuário deve conter somente letras"
      return log
    }

    return log;
  }
}