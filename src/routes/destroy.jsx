import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

export async function action({ params }) {
  // throw new Error('Erro na hora de deletar');
  await deleteContact(params.contactID);
  return redirect('/');
}
