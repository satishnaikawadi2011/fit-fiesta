import { useColorMode } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { SWAL_DARK_BG, SWAL_LIGHT_BG } from '../../constants/colors';

export type UserLogType = 'success' | 'error' | 'info' | 'toast' | 'success-html';

const MySwal = withReactContent(Swal);

export const userLog = async (
	type: UserLogType,
	message: string | HTMLElement | JQuery | undefined,
	mode: 'dark' | 'light' = 'dark'
) => {
	const color =

			mode === 'light' ? '#000000' :
			'#ffffff';
	const bgColor =

			mode === 'light' ? SWAL_LIGHT_BG :
			SWAL_DARK_BG;
	switch (type) {
		case 'error':
			return MySwal.fire({
				background: bgColor,
				position: 'center',
				icon: 'error',
				title: 'Oops...',
				text: message as string,
				color
			});
		case 'info':
			return Swal.fire({
				background: bgColor,
				color,
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
				background: bgColor,
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
					},
				color
			});

		case 'success-html':
			return Swal.fire({
				background: bgColor,
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
					},
				color
			});
		case 'toast':
			const Toast = Swal.mixin({
				background: bgColor,
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				color
			});
			return Toast.fire({
				icon: 'info',
				title: message
			});
		default:
			alert(message);
	}
};
