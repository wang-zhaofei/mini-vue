import { h } from "../../lib/guid-mini-vue.es.js"
import { Foo } from "./Foo.js"

export const App = {
    name: "App",
    render() {
        const app = h("div", {}, "App")
        const foo = h(Foo, {}, h("p", {}, "456"))
        return h("div", {}, [app, foo])
    },
    setup() {
        return {}
    }
}