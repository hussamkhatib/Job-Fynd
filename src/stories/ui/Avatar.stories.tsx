import Avatar from '../../components/ui/Avatar';

export default {
    title: 'Avatar',
    component: Avatar,
};

export const FallBack = () =>
    <div className='flex gap-x-4'>
        <Avatar name='Hussam' />
        <Avatar name='Hussam Khatib' />
        <Avatar name='Hussam Khatib Hussam Khatib' />
        <Avatar name='' />
        <Avatar />
    </div>