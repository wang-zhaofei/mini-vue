import { effect } from "../effect";
import { reactive } from "../reactive";
import { ref, isRef } from "../ref"

describe("ref",()=>{
    it("happy path", ()=>{
        const num = ref(1)
        expect(num.value).toBe(1)
    })
    it("should be reactive",()=>{
        const num = ref(1)
        let dummy
        let calls = 0
        effect(()=>{
            calls++
            dummy = num.value
        })

        expect(calls).toBe(1)
        expect(dummy).toBe(1)
        num.value = 2
        expect(calls).toBe(2)
        expect(dummy).toBe(2)

        num.value = 2
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
    })

    it("should make nested properties reactive",()=>{
        const a = ref({
            count:1
        })

        let dummy
        effect(()=>{
            dummy = a.value.count
        })
        expect(dummy).toBe(1)
        a.value.count = 2
        expect(dummy).toBe(2)
    })

    it("isRef",()=>{
        const a = ref(1)
        const user = reactive({
            age:1
        })

        expect(isRef(a)).toBe(true)
        expect(isRef(1)).toBe(false)
        expect(isRef(user)).toBe(false)
    })
})