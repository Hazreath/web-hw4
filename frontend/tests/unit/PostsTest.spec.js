import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Posts from "../../src/components/Posts.vue";
import { post } from '../../../backend/routes/posts';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

//Create dummy store
const store = new Vuex.Store({
    state: {
        user: {
            id: 1,
            firstname: 'test',
            lastname: 'test',
            email: 'test',
            avatar: 'test',
        }
    },
    getters: {
        user: (state) => state.user,
    }
});

//Create dummy routes
const routes = [
    {
        path: '/',
        name: 'posts',
    },
    {
        path: '/profiles',
        name: 'profiles'
    }
];

const router = new VueRouter({routes});

const testData = [
    {
        id: 1,
        text: "I think it's going to rain",
        createTime: "2020-12-05 13:53:23",
        likes: 0,
        liked: false,
        media: {
            url: "test-image.jpg",
            type: "image"
        },
        author: {
            id: 2,
            firstname: "Gordon",
            lastname: "Freeman",
            avatar: 'avatar.url'
        }
    },
    {
        id: 2,
        text: "Which weighs more, a pound of feathers or a pound of bricks?",
        createTime: "2020-12-05 13:53:23",
        likes: 1,
        liked: true,
        media: null,
        author: {
            id: 3,
            firstname: "Sarah",
            lastname: "Connor",
            avatar: 'avatar.url'
        }
    },
    {
        id: 4,
        text: null,
        createTime: "2020-12-05 13:53:23",
        likes: 3,
        liked: false,
        media: {
            url: "test-video.mp4",
            type: "video"
        },
        author: {
            id: 5,
            firstname: "Richard",
            lastname: "Stallman",
            avatar: 'avatar.url'
        }
    }
];

//Mock axios.get method that our Component calls in mounted event
jest.mock("axios", () => ({
    get: () => Promise.resolve({
        data: testData
    })
}));

// Task 4
describe('Posts', () => {

    const wrapper = mount(Posts, {router, store, localVue});

    it('1 == 1', function () {
        const posts = wrapper.findAll('.post')

        expect(posts.length).toBe(testData.length)

        for (let i = 0; i < posts.length; i++) {
            const postHtml = posts.at(i)
            const postData = testData[i]

            console.log({postHtml})

            const postImage = postHtml.find('.post-image')
            const author = postHtml.find('.post-author')
            expect(author.exists()).toBe(true)

            const createdAtEl = postHtml.find('.post-author > small')
            expect(createdAtEl.exists()).toBe(true)

            expect(createdAtEl.text()).toBe('Saturday, December 5, 2020 1:53 PM')

            // image or video tags are rendered depending on media.type property, or if media property is absent nothing is rendered.
            expect(postImage.exists()).toBe(postData.media ? true : false)

            if (postData.media) {
                expect(postImage.find('img').exists()).toBe(postData.media.type === 'image')
                expect(postImage.find('video').exists()).toBe(postData.media.type === 'video')
            }
            

        }

        expect(true).toBe(true)
    });
});