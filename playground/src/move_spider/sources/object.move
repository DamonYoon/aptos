module 0xcafe::object_test {
  use aptos_framework::object;
  use std::signer;

  #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
  struct ExampleObject has key {
    value: u64,
  }

  public fun example_object(user: &signer, value: u64): address {
    let owner_address = signer::address_of(user);
    let example_object_constructor_ref = &object::create_object(owner_address);
    let object_signer = &object::generate_signer(example_object_constructor_ref);
    move_to(object_signer, ExampleObject {
        value,
    });
    object::address_from_constructor_ref(example_object_constructor_ref)
  }
}