import { shallowReadonly } from "../reactivity/reactive"
import { initProps } from "./componentProps"
import { PublicInstaceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode){
    const component = {
        vnode,
        type:vnode.type,
        setupState:{},
        props:{}
    }

    return component
}

export function setupComponent(instance){
    // TODO
    initProps(instance, instance.vnode.props)
    // initSlots()

    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance){
    const Component = instance.type

    instance.proxy = new Proxy({
        _:instance
    },PublicInstaceProxyHandlers)

    const { setup } =  Component

    if(setup){
        const setupResult = setup(shallowReadonly(instance.props))

        handleSetupResult(instance, setupResult)
    }
}

function handleSetupResult(instance, setupResult){
    if(typeof setupResult === "object"){
        instance.setupState = setupResult
    }
    finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
    const Component = instance.type
    instance.render = Component.render
    
    // if(Component.render){
    //     instance.render = Component.render
    // }
}
