
export interface AuthResponse {
    token: string;
    user_id: number;
}


export interface Usuario {
    user_id: number;
    firstname: string;
    lastname: string;
    username: string;
    status: string;
    dob: Date;
    user_role: string;
}

export interface Message {
    message_id: number;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    possible_appt: string;
    message: string;
    fecha_mensaje: Date;
    status_id: number;
    message_users?: {
      message_users_id: number;
      message_id: number;
      status_id: number;
      fecha_cambio: Date;
      user_id: number;
    }
  }


  export interface MessageStatus {
    message_users_id: number;
    message_id: number;
    status_id: number;
    fecha_cambio: string;
    user_id: number;
  }
  