export interface IValidationError {
  message: string;
  errors: Record<string, string[]>
}

export interface ITeam {
  full_name: string
}

export interface IPlayer {
  id: number,
  first_name: string,
  last_name: string,
  position: string,
  team: ITeam,
  favorite?: boolean
}

export interface IMeta {
  total_pages: number;
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
}
