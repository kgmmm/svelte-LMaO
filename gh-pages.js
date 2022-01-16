import { publish } from 'gh-pages';

publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/kgmmm/svelte-LMaO.git',
        user: {
            name: 'kgmmm',
            email: 'kgmofficial0@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)