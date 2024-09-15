export interface Response {
  wind: Wind;
  precipitation: Precipitation;
  inferenceEngineValue: Fuzzyfication;
  uvindex: Uvindex;
}

export interface Precipitation {
  value: number;
  measurement_units: string;
  Fuzzyfication: Fuzzyfication;
}

export interface Wind {
  wind_speed: Windspeed;
  wind_direction: Windspeed;
  Fuzzyfication: Fuzzyfication;
}

export interface Fuzzyfication {
  linguisticValue: string;
  description: string;
  image: Image;
}

export interface Image {
  url: string;
  source: string;
}

export interface Windspeed {
  value: number;
  measurement_units: string;
}

export interface Uvindex {
  time: number;
  suffix: string;
  icon: string;
  feels_like: number;
  temp: number;
  iuv: string;
  arrayData: Array<0>;
  hour: number;
  today: String;
}

export interface ApiKey {
  id_api: string;
  nombre_api: string;
  api_key: string;
  status_api: string;
}

export interface ServerSmtp {
  service: string,
  servidor: string;
  puerto: number;
  ssl: boolean;
  rejectUnauthorized:boolean;
  usuario: string;
  password: string;
}

export interface DataBase {
  id_database: number;
  nombre_database: string;
  descripcion_database: string;
  estado_database: number;
  puerto_database: number;
  usuario_database: string;
  host_database: string;
  password_database: string;
  trusted_connection: boolean;
  trusted_server: boolean;
  enable_airth_host: boolean;
  encript_database: boolean;
  mensaje;
}

export interface User {
  id_usuario: Number;
  correo_electronico: string;
  nombre: string;
  apellido: string;
  id_categoria_usuario: Number;
  id_tipo_usuario: Number;
  estado_usuario: boolean;
  usuario_password: string;
}

export interface Email {
  id_correo?: Number;
  asunto?: string;
  contenido_html?: string;
}