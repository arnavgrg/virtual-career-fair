import { AbstractSocketProtocol } from "./abstractSocketProtocol";

/*
    HOW TO USE:
    - const careerFairSocketProtocol = CareerFairSocketProtocol.getOrCreate();
    - careerFairSocketProtocol.registerEventListeners(io.of('namespace_name'))
*/

class CareerFairSocketProtocol extends AbstractSocketProtocol
{
    // Implementing singleton pattern
    private static instance = new CareerFairSocketProtocol();

    private constructor()
    {
        super();
        // Initialize connection pool
        this.connectionPool = new Array<string>();
    }

    static getOrCreate()
    {
        if (this.instance == undefined)
        {
            this.instance = new CareerFairSocketProtocol();
        }
        return this.instance;
    }

    // Methods required to implement by ISocketProtocol Interface
    registerEventListeners(namespace: any) 
    {
        namespace.on('connection', 
            socket =>
            {
                // Handle connection
                this.onConnection(socket);

                // Register disconnection event
                socket.on('disconnect', this.onDisconnection);
            }
        );
    }


}

export { CareerFairSocketProtocol }