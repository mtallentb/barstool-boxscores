export default interface EventInformation {
  temperature: number;
  site: {
    capacity: number;
    surface: string;
    name: string;
    state: string;
    city: string;
  };
  attendance: number;
  duration: string;
  status: string;
  season_type: string;
  start_date_time: string;
}
