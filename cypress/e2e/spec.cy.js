describe("test web-site", ()=>{
  beforeEach(()=>{
    cy.visit("https://demowebshop.tricentis.com")
    cy.get("[href='/login']").click()
    cy.get(".email")
    .type("dammarchanel@gmail.com")
    .should("have.value", "dammarchanel@gmail.com")
    cy.get(".password").type("admin123").should("have.value", "admin123")
    cy.get("#RememberMe").click()
    cy.get(".login-button").click()
  })  
  
  it("check len books", ()=>{
    cy.get(".top-menu > li").first().click()
    cy.get(".product-grid > div")
    .children()
    .should("have.length", 6)
  })

  it("add item in cart", ()=>{
    cy.get(".top-menu > li").first().click()
    cy.get("[value='Add to cart']").first().click()
    cy.get(".bar-notification").should("have.css", "display", "block")
    cy.get(".bar-notification > p").should("have.text", "The product has been added to your shopping cart")
  })

  it("add address", ()=>{
    let dataAddress = ["Никита", "Вахрушев", "dammarchanel@gmail.com", "TestWebSite", "Ижевск", "ул. Пушкинская, 258б", "ул. 8 Марта, 3а", "121414", "89828224419", "12131314"]
    cy.get(".header-links > ul > li").eq(0).click()
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/customer/info")
    cy.get(".list > li > a").eq(1).click()
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/customer/addresses")
    cy.get("[value='Add new']").click()
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/customer/addressadd")
    let countData = 0
    for(let index = 0; index <= 9; index++){
      cy.get(".text-box")
      .eq(index)
      .type(dataAddress[countData])
      .should("have.value", dataAddress[countData])
      countData += 1
    }
    cy.get("[data-val-number='The field Country must be a number.']")
    .select("66")
    .should("have.value", "66")
    cy.get(".save-address-button").click()
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/customer/addresses")  
  })

  it("order a product", ()=>{
    cy.get(".header-links > ul > li").eq(2).click()
    cy.get(".order-summary-content").should("not.include.text" ,"Your Shopping Cart is empty!")
    cy.get("#termsofservice").click()
    cy.contains("checkout").click()
    cy.location('href').should("eq", "https://demowebshop.tricentis.com/onepagecheckout")
    for(let index = 0; index <= 4; index++){
      cy.get("[value = 'Continue']").eq(index).click()
      cy.get(".tab-section").eq(index+1).should("have.class", 'active')
    }
    cy.get("[value='Confirm']").click()
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/checkout/completed/")
    cy.get(".order-completed").should("include.text", "Your order has been successfully processed!")
    cy.get("[value='Continue']").click()
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/")
  })

  it("search item", ()=>{
    let CtxSearch = "Simple Computer"
    cy.get(".search-box-text").type(CtxSearch).should("have.value", CtxSearch)
    cy.get("[value='Search']").click()
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/search?q=Simple+Computer")
    cy.get(".search-text").should("have.value", CtxSearch)
    cy.get(".product-grid > div").should("have.length", 1)
    cy.get(".product-title").should("include.text", CtxSearch)
  })

})