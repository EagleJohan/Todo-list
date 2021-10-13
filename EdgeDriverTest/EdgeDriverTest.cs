using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Html5;
using OpenQA.Selenium.Support.UI;
using System;
using Newtonsoft.Json;

namespace EdgeDriverTest
{
    [TestClass]
    public class EdgeDriverTest
    {
        private const string edgeDriverDirectory = @"C:\Users\Johan\Desktop\Microsoft_Edge_Driver";
        private EdgeDriver browser;

        [TestInitialize]
        public void EdgeDriverInitialize()
        {
            browser = new EdgeDriver(edgeDriverDirectory);
            browser.Url = "https://eaglejohan.github.io/Todo-list/#";
        }

        [TestMethod]
        public void AddTodo()
        {
            var input = browser.FindElement(By.Id("input-todo"));
            input.SendKeys("Test one");
            input.SendKeys(Keys.Enter);

            var count = browser.FindElements(By.ClassName(".list-todo")).Count;
            Assert.AreEqual(count, 1);
        }
        [TestMethod]
        public void OneCompleted()
        {
            var input = browser.FindElement(By.Id("input-todo"));
            input.SendKeys("Test one");
            input.SendKeys(Keys.Enter);

            var itemsLeft = browser.FindElement(By.Id("todos-remaining"));
            Assert.AreEqual(itemsLeft.Text, "1 item left");

            var checkBox = browser.FindElement(By.ClassName("completed-box"));
            checkBox.Click();

            Assert.AreEqual(itemsLeft.Text, "0 item left");

        }
        [TestMethod]
        public void MultipleCompleted()
        {
            var input = browser.FindElement(By.Id("input-todo"));
            for (int i = 0; i < 3; i++)
            {
                input.SendKeys("Test" + i.ToString());
                input.SendKeys(Keys.Enter);
            }

            var checkBox = browser.FindElement(By.ClassName("completed-box"));
            checkBox.Click();

            var itemsLeft = browser.FindElement(By.Id("todos-remaining"));
            Assert.AreEqual(itemsLeft.Text, "2 items left");
        }
        [TestMethod]
        public void HashChange()
        {
            var input = browser.FindElement(By.Id("input-todo"));
            input.SendKeys("Test one");
            input.SendKeys(Keys.Enter);

            var filterActive = browser.FindElement(By.Id("filter-active"));
            filterActive.Click();

            Assert.AreEqual("https://eaglejohan.github.io/Todo-list/#active", browser.Url);
        }
        [TestMethod]
        public void LocalStorage()
        {
            var input = browser.FindElement(By.Id("input-todo"));
            input.SendKeys("Test one");
            input.SendKeys(Keys.Enter);
            input.SendKeys("Test two");
            input.SendKeys(Keys.Enter);

            var localStorage = browser.ExecuteScript(@"return localStorage.getItem(""todos"")").ToString();

            //Asserts with JSONised file
            Assert.AreEqual(@"[{""text"":""Test one"",""completed"":false},{""text"":""Test two"",""completed"":false}]", localStorage);
        }
        [TestMethod]
        public void EditTodo()
        {
            var input = browser.FindElement(By.Id("input-todo"));
            input.SendKeys("Test one");
            input.SendKeys(Keys.Enter);

            var todo = browser.FindElement(By.ClassName("reg-todo"));
            var inputValue = todo.GetAttribute("value");
            //Check if inputvalue is test one before editing
            Assert.AreEqual("Test one", inputValue);
            //Simulate doubleclick for activating edit mode
            browser.ExecuteScript(@"document.querySelector("".reg-todo"").removeAttribute(""readonly"")");

            todo.SendKeys(" EDITED");
            todo.SendKeys(Keys.Enter);
            inputValue = todo.GetAttribute("value");
            Assert.AreEqual("Test one EDITED", inputValue);

        }
        [TestCleanup]
        public void EdgeDriverCleanup()
        {
            browser.Quit();
        }
    }
}
