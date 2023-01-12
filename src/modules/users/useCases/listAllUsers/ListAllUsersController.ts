import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
		const users = this.listAllUsersUseCase.execute({
		user_id: String(user_id)
		});

		return response.status(200).json(users);
	} catch(error) {
		if(error.message === "User not found.") {
			return response.status(400).json({ error: error.message });
		}
		else if(error.message === "This user is not an admin.") {
			return response.status(400).send({ error: error.message });
		}

		return response.status(500).send();
	}
  }
}

export { ListAllUsersController };
