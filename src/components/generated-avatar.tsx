import {createAvatar} from '@dicebear/core';
import { botttsNeutral, initials } from '@dicebear/collection';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GenaratedAvatarProps {
    className?: string;
    seed: string;
    variant?: 'botttsNeutral' | 'initials';
}   

export const GeneratedAvatar = ({ className, seed, variant}: GenaratedAvatarProps) => {
    let avatar;

    if (variant === 'botttsNeutral') {
        avatar = createAvatar(botttsNeutral, {
            seed,
        })
    } else {
        avatar = createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 42
        })
    }
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt='avatar' />
            <AvatarFallback className="bg-muted">
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}
