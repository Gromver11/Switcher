"use strict"
document.addEventListener("click", ftogglr);

function ftogglr(event) {
    const target = event.target;
    const ToggleClass = target.closest("[data-togglr-toggle]");
    const Selector = target.closest("[data-toggl-target]");
    const SelectorValue = Selector.dataset.togglTarget;
    const AddClass = target.closest("[data-togglr-add]");
    const RemoveClass = target.closest("[data-togglr-remove]");
    const SelectorValueEl = document.querySelectorAll(SelectorValue);
    const Exclusive = target.closest("[data-togglr-exclusive]");
    const ExclusiveAdd = target.closest("[data-togglr-exclusiveAdd]");

    if (ToggleClass !== null) {
        const ToggleClassValue = ToggleClass.dataset.togglrToggle;
        SelectorValueEl.forEach(function (element) {
            element.classList.toggle(ToggleClassValue);
        })
    }
    else if (AddClass !== null) {
        const AddClassValue = AddClass.dataset.togglrAdd;
        SelectorValueEl.forEach(function (element) {
            element.classList.add(AddClassValue);
        })
    }
    else if (RemoveClass !== null) {
        const RemoveClassValue = RemoveClass.dataset.togglrRemove;
        SelectorValueEl.forEach(function (element) {
            element.classList.remove(RemoveClassValue);
        })
    }
    else if (Exclusive !== null) {
        const ExclusiveValue = Exclusive.dataset.togglrExclusive;
        SelectorValueEl.forEach(function (element) {
            element.classList.add(ExclusiveValue);
            element.nextElementSibling.classList.remove(ExclusiveValue);
            element.previousElementSibling.classList.remove(ExclusiveValue);
        })

    }

    else if (ExclusiveAdd !== null) {
        const ExclusiveAddValue = ExclusiveAdd.dataset.togglrExclusiveadd;
        SelectorValueEl.forEach(function (element) {
            element.classList.add(ExclusiveAddValue);
            element.nextElementSibling.classList.add(ExclusiveAddValue);
            element.previousElementSibling.classList.add(ExclusiveAddValue);
        })
    }
    else {
        console.log ("Togglr does not work!")
    }

}


