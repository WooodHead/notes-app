import axios from "axios"
import { NewNote } from "../interfaces/notes"
import { userService } from "./userService"

class NoteService {
	public async getAllUserNotes(): Promise<any> {
		let user = await userService.getLoggedInUser()
		axios
			.get(`http://localhost:3000/notes/`, user.email)
			.then(res => console.log(res.data))
	}

	public async addNote(note: any): Promise<any> {
		await axios.post(`http://localhost:3000/notes`, note)
	}

	public async updateNote(id: string, update: any): Promise<any> {
		await axios.patch(`http://localhost:3000/notes/${id}`, update)
	}

	public async removeNote(id: string): Promise<any> {
		await axios.delete(`http://localhost:3000/notes/${id}`)
	}
}

const notesApi = new NoteService()

export { notesApi }
