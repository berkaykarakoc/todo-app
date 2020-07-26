/* globals gauge*/
"use strict";
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    into,
    text,
    textBox,
    toRightOf,
    click,
    below,
    $,
} = require("taiko");
const assert = require("assert");

beforeSuite(async () => {
    await openBrowser({args: [
        '--disable-gpu',
         '--disable-dev-shm-usage',
         '--disable-setuid-sandbox',
         '--no-first-run',
         '--no-sandbox',
         '--no-zygote']});
    await goto("http://localhost:3000");
});

afterSuite(async () => {
    await click(text("X", toRightOf(text("buy some milk"))));
    await click(text("X", toRightOf(text("enjoy the assignment"))));
    await click(text("X", toRightOf(text("drink water"))));
    await closeBrowser();
});

step("Add element to the todo list", async () => {
    const content = "buy some milk";
    await write(content, into(textBox({ placeholder: "Add todos" })));
    await click("ADD");
    assert.ok(await text(content).exists());
});

step("Add element below to the other items", async () => {
    const content = "enjoy the assignment";
    await write(content, into(textBox({ placeholder: "Add todos" })));
    await click("ADD");
    assert.ok(await text(content).exists(below(text("buy some milk"))));
});

step("Check item", async () => {
    const content = "buy some milk";
    await click(text(content));
    assert.ok(await $("#checked").exists(text(content)));
});

step("Uncheck item", async () => {
    const content = "buy some milk";
    await click(text(content));
    assert.ok(!(await $("#checked").exists(0, 0, text(content))));
});

step("Delete Item", async () => {
    const content = "rest for a while";
    await write(content, into(textBox({ placeholder: "Add todos" })));
    await click("ADD");
    await click(text("X", toRightOf(text(content))));
    assert.ok(!(await text(content).exists(0, 0)));
});

step("Delete item 2", async () => {
    await write(
        "rest for a while",
        into(textBox({ placeholder: "Add todos" }))
    );
    await click("ADD");

    const content = "drink water";
    await write(content, into(textBox({ placeholder: "Add todos" })));
    await click("ADD");

    await click(text("X", toRightOf(text("rest for a while"))));
    assert.ok(!(await text("rest for a while").exists(0, 0)));
    assert.ok(await text(content).exists());
});
