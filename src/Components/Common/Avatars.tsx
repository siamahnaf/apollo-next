import Avatar, { AvatarProps } from '@mui/material/Avatar';

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            fontWeight: 700,
            width: 50,
            height: 50,
            fontSize: "22px",
            background: `linear-gradient(#ffffff -125%, ${stringToColor(name)})`
        },
        children: `${name?.split(' ')[0][0]}`,
    };
}

interface Props {
    name: string;
    avatarProps?: AvatarProps
}


const Avatars = ({ name, avatarProps }: Props) => {
    return (
        <Avatar {...stringAvatar(name)} {...avatarProps} />
    );
};
export default Avatars;
