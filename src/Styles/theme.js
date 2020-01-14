import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
console.log(process.env);

/* Creates custom MaterialUI theme for the project. */

const theme = createMuiTheme({
	palette: {
		type: 'light',
		background: {
			default: 'f2f6f2',
			paper: '#fafafa'
		},
		primary: {
			light: '#72b96e',
			main: '#4fa84a',
			dark: '#3f863b'
		},
		secondary: {
			light: '#9cbbd2',
			main: '#84aac7',
			dark: '#69889f'
		},
		error: {
			light: red['A100'],
			main: red[500],
			dark: red['A700'],
		},
		text: {
			primary: '#2B2729',
			secondary: '#403c3e',
			disabled: '#959394',
		},
	},
	typography: {
		fontFamily: [
			'Open Sans',
			'Roboto',
			'Helvetica',
			'Arial',
			'sans-serif'
		].join(',')
	},
	spacing: 8,
	shape: {
		borderRadius: 4
	},
	shadows: [
		'none',
		'0px 1px 3px 0px rgba(55,55,55,0.09),0px 1px 2px 0px rgba(55,55,55,0.05),0px 2px 5px -1px rgba(55,55,55,0.25)',
		'0px 1px 5px 0px rgba(55,55,55,0.09),0px 2px 3px 0px rgba(55,55,55,0.05),0px 3px 7px -2px rgba(55,55,55,0.25)',
		'0px 1px 8px 0px rgba(55,55,55,0.09),0px 3px 4px 0px rgba(55,55,55,0.05),0px 3px 9px -2px rgba(55,55,55,0.25)',
		'0px 2px 4px -1px rgba(55,55,55,0.09),0px 4px 5px 0px rgba(55,55,55,0.05),0px 1px 10px 0px rgba(55,55,55,0.25)',
		'0px 3px 5px -1px rgba(55,55,55,0.09),0px 5px 8px 0px rgba(55,55,55,0.05),0px 1px 14px 0px rgba(55,55,55,0.25)',
		'0px 3px 5px -1px rgba(55,55,55,0.09),0px 6px 10px 0px rgba(55,55,55,0.05),0px 1px 18px 0px rgba(55,55,55,0.25)',
		'0px 4px 5px -2px rgba(55,55,55,0.09),0px 7px 10px 1px rgba(55,55,55,0.05),0px 2px 16px 1px rgba(55,55,55,0.25)',
		'0px 5px 5px -3px rgba(55,55,55,0.09),0px 8px 10px 1px rgba(55,55,55,0.05),0px 3px 14px 2px rgba(55,55,55,0.25)',
		'0px 5px 6px -3px rgba(55,55,55,0.09),0px 9px 12px 1px rgba(55,55,55,0.05),0px 3px 16px 2px rgba(55,55,55,0.25)',
		'0px 6px 6px -3px rgba(55,55,55,0.09),0px 10px 14px 1px rgba(55,55,55,0.05),0px 4px 18px 3px rgba(55,55,55,0.25)',
		'0px 6px 7px -4px rgba(55,55,55,0.09),0px 11px 15px 1px rgba(55,55,55,0.05),0px 4px 20px 3px rgba(55,55,55,0.25)',
		'0px 7px 8px -4px rgba(55,55,55,0.09),0px 12px 17px 2px rgba(55,55,55,0.05),0px 5px 22px 4px rgba(55,55,55,0.25)',
		'0px 7px 8px -4px rgba(55,55,55,0.09),0px 13px 19px 2px rgba(55,55,55,0.05),0px 5px 24px 4px rgba(55,55,55,0.25)',
		'0px 7px 9px -4px rgba(55,55,55,0.09),0px 14px 21px 2px rgba(55,55,55,0.05),0px 5px 26px 4px rgba(55,55,55,0.25)',
		'0px 8px 9px -5px rgba(55,55,55,0.09),0px 15px 22px 2px rgba(55,55,55,0.05),0px 6px 28px 5px rgba(55,55,55,0.25)',
		'0px 8px 10px -5px rgba(55,55,55,0.09),0px 16px 24px 2px rgba(55,55,55,0.05),0px 6px 30px 5px rgba(55,55,55,0.25)',
		'0px 8px 11px -5px rgba(55,55,55,0.09),0px 17px 26px 2px rgba(55,55,55,0.05),0px 6px 32px 5px rgba(55,55,55,0.25)',
		'0px 9px 11px -5px rgba(55,55,55,0.09),0px 18px 28px 2px rgba(55,55,55,0.05),0px 7px 34px 6px rgba(55,55,55,0.25)',
		'0px 9px 12px -6px rgba(55,55,55,0.09),0px 19px 29px 2px rgba(55,55,55,0.05),0px 7px 36px 6px rgba(55,55,55,0.25)',
		'0px 10px 13px -6px rgba(55,55,55,0.09),0px 20px 31px 3px rgba(55,55,55,0.05),0px 8px 38px 7px rgba(55,55,55,0.25)',
		'0px 10px 13px -6px rgba(55,55,55,0.09),0px 21px 33px 3px rgba(55,55,55,0.05),0px 8px 40px 7px rgba(55,55,55,0.25)',
		'0px 10px 14px -6px rgba(55,55,55,0.09),0px 22px 35px 3px rgba(55,55,55,0.05),0px 8px 42px 7px rgba(55,55,55,0.25)',
		'0px 11px 14px -7px rgba(55,55,55,0.09),0px 23px 36px 3px rgba(55,55,55,0.05),0px 9px 44px 8px rgba(55,55,55,0.25)',
		'0px 11px 15px -7px rgba(55,55,55,0.09),0px 24px 38px 3px rgba(55,55,55,0.05),0px 9px 46px 8px rgba(55,55,55,0.25)',
	]
});

console.log(theme);

export default theme;
