module 0xcafe::spider_army {
  // Self는 모듈 내에서 사용할 수 있는 모듈 자체를 가리킨다.
  use 0xcafe::spider_nest::{Self, Spider};

  struct SpiderArmy has key {
    spiders: vector<Spider>,
  }

  // signer는 사용자 계정에 대한 권한을 가진 객체이다.
  // 따라서 signer를 다른 모듈의 함수에 전달할 때는 주의가 필요하다.
  /* 위험한 코드 예시: 알 수 없는 모듈에 사용자 계정을 전달하고 있음
  public fun transfer_funds(signer: &signer, to: address, amount: u64) {
    SomeModule::send_money(signer, to, amount);
  } 
  */
  public fun create_army(user: &signer) {
    move_to(user, SpiderArmy {
      spiders: vector[],
    });
  }

  // 앱토스에서는 public 함수를 트랜잭션에서 직접 호출 할 수 없다.
  // entry 함수로 선언하면 트랜잭션에서 직접 호출할 수 있다.
  // public entry 함수는 일반 public 함수처럼 외부 모듈에서 호출할 수 있다.
  // private entry 함수는 외부 모듈에서 호출할 수 없고, 오직 user transaction로만 호출할 수 있다.
  entry fun add_spider(user: &signer, dna: u64) {
    spider_nest::spawn_spider(dna);
    let spider_army = get_mut_army(signer::address_of(user));
    vector::push_back(&mut spider_army.spiders, spider_nest::get_spider());
  }

  // inline 함수는 리소스와 서명자 참조 반환하고 매크로를 인자로 받을 수 있다.
  inline fun get_mut_army(user: address): &mut SpiderArmy {
    borrow_global_mut<SpiderArmy>(user)
  }
}

module 0xcafe::spider_nest {
  use aptos_framework::account;
  use aptos_framework::event;
  use std::vector;

  // friend 키워드를 사용하여 다른 모듈에게 접근 권한을 부여할 수 있다.
  friend 0xcafe::spider_army;

  struct SpiderDna has key {
    dna_digits: u64,
    dna_modulus: u64,
  }

  struct Spider has store {
    dna: u64,
  }

  #[event]
  struct SpawnSpiderEvent has drop, store {
    dna: u64,
  }

  struct SpiderSwarm has key {
    spiders: vector<Spider>,
  }

  fun init_module(cafe_signer: &signer) {
    let dna_modulus = 10 ^ 10;
    move_to(cafe_signer, SpiderDna {
      dna_digits: 10,
      dna_modulus,
    });
    move_to(cafe_signer, SpiderSwarm {
      spiders: vector[],
      
    });
  }

  // public(friend) 키워드를 사용하여 다른 모듈에게 접근 권한을 부여할 수 있다.
  public(friend) fun spawn_spider(dna: u64) acquires SpiderSwarm {
    let spider = Spider {
      dna,
    };
    let spider_swarm = borrow_global_mut<SpiderSwarm>(@0xcafe);
    vector::push_back(&mut spider_swarm.spiders, spider);

    event::emit(SpawnSpiderEvent {
      dna,
    });
  }

  public(friend) fun get_spider(): Spider acquires SpiderSwarm {
    vector::pop_back(&mut borrow_global_mut<SpiderSwarm>(0xcafe).spiders)
  }
}


/*
public fun double_up() {
    let original = vector[1, 2, 3];
    let doubled = vector::map(original, |element| element * 2);
}
*/