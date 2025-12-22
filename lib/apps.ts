import CakesApp from "@/apps/cakes";
import GaleryApp from "@/apps/galery";
import GiftApp from "@/apps/gift";
import MusicApp from "@/apps/music";
import YappinngApp from "@/apps/yapping";

export const apps = {
    gift: {
        title: "Gift",
        component: GiftApp,
        icon: "🎁",
    },
    galery: {
        title: "Galery",
        component: GaleryApp,
        icon: "📷",
    },
    music: {
        title: "Music Player",
        component: MusicApp,
        icon: "⏯️",
    },
    cakes: {
        title: "Cakes",
        component: CakesApp,
        icon: "🎂",
    },
    yapping: {
        title: "Yapping",
        component: YappinngApp,
        icon: "📣",
    },
};

export type AppKey = keyof typeof apps;
