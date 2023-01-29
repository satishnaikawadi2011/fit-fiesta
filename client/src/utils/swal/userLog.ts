import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { SWAL_BG } from '../../constants/colors';

export type UserLogType = 'success' | 'error' | 'info' | 'toast' | 'success-html';

const MySwal = withReactContent(Swal);

export const userLog = async (type: UserLogType, message: string | HTMLElement | JQuery | undefined) => {
	switch (type) {
		case 'error':
			return MySwal.fire({
				background: SWAL_BG,
				position: 'center',
				icon: 'error',
				title: 'Oops...',
				text: message as string
			});
		case 'info':
			return Swal.fire({
				background: SWAL_BG,
				position: 'center',
				icon: 'info',
				title: 'Info',
				text: message as string,
				showClass:
					{
						popup: 'animate__animated animate__fadeInDown'
					},
				hideClass:
					{
						popup: 'animate__animated animate__fadeOutUp'
					}
			});
		case 'success':
			return Swal.fire({
				background: SWAL_BG,
				position: 'center',
				icon: 'success',
				title: 'Success',
				text: message as string,
				showClass:
					{
						popup: 'animate__animated animate__fadeInDown'
					},
				hideClass:
					{
						popup: 'animate__animated animate__fadeOutUp'
					}
			});

		case 'success-html':
			return Swal.fire({
				background: SWAL_BG,
				position: 'center',
				icon: 'success',
				title: 'Success',
				html: message,
				showClass:
					{
						popup: 'animate__animated animate__fadeInDown'
					},
				hideClass:
					{
						popup: 'animate__animated animate__fadeOutUp'
					}
			});
		case 'toast':
			const Toast = Swal.mixin({
				background: SWAL_BG,
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000
			});
			return Toast.fire({
				icon: 'info',
				title: message
			});
		default:
			alert(message);
	}
};
