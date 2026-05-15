//class that stores the secret password
export class Secret
{
    secret_sauce: string = "secret_sauce"
    //method that returns the password
    public getPassword(): string
    {
        return this.secret_sauce;
    }
}