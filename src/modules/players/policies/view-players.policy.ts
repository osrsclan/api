import { Policy } from '../../../types/policy';

export class ViewPlayersPolicy extends Policy<{ Querystring: { name: string }}> {
    /**
     * Determine if the user can view the list of players.
     */
    public async can(): Promise<boolean> {
        return this.request.query.name === 'Man Bag';
    }
}