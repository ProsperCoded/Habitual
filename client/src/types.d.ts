export type UserProfileType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
};
export type Habit = {
  id: number;
  name: string;
  habitState: 'public' | 'private';
};
export interface HabitGroup {
  id: number;

  name: string;
  description: string;
  startData: string;
  creator: UserProfileType;
  interval: string;
  habit: Habit;
  members: { userId: number; user: UserProfileType }[];
  groupState: 'public' | 'private';
}
