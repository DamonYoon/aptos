module 0xcafe::spider_army {
  // Self는 모듈 내에서 사용할 수 있는 모듈 자체를 가리킨다.
  use 0xcafe::spider_nest::{Self, Spider};
  use std:signer;
  // 일반 vector는 많은 요소를 가질 때 메모리를 많이 사용하며, 이로 인해 가스 비용이 높아진다.
  // smart_vector는 요소를 저장할 때 메모리를 절약하며, 가스 비용을 줄일 수 있다.
  // 작은 수의 요소를 저장할 때도 동일한 가스 비용을 사용하며, 벡터의 길이가 증가할 때 메모리를 더 효율적으로 사용한다.
  use aptos_std::smart_vector::{Self, SmartVector};
  use aptos_framework::account;
  use aptos_framework::event;

  struct SpiderArmy has key {
    spiders: smart_vector<Spider>,
  }

  #[event]
  struct AttackEvent has drop, store {
    attacker: address,
    defender: address,
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
      spiders: smart_vector::new(),
    });
    move_to(user, SpiderArmyEvents {
      attack_events: account::new_event_handle<AttackEvent>(user),
    });
  }

  // 앱토스에서는 public 함수를 트랜잭션에서 직접 호출 할 수 없다.
  // entry 함수로 선언하면 트랜잭션에서 직접 호출할 수 있다.
  // public entry 함수는 일반 public 함수처럼 외부 모듈에서 호출할 수 있다.
  // private entry 함수는 외부 모듈에서 호출할 수 없고, 오직 user transaction로만 호출할 수 있다.
  entry fun add_spider(user: &signer, dna: u64) {
    spider_nest::spawn_spider(dna);
    let spider_army = get_mut_army(signer::address_of(user));
    smart_vector::push_back(&mut spider_army.spiders, spider_nest::get_spider());
  }

  // pop_back 함수는 벡터의 마지막 요소를 제거하고 반환한다. drop 속성이 없더라도 요소는 제거할 수 있다.
  // length 함수는 벡터의 길이를 반환한다.
  // while 루프를 사용하여 벡터의 모든 요소를 제거한다.
  public entry fun attack(attacker: address, defender: address) acquires SpiderArmy {
    let defender_army = get_mut_army(defender);
    let attacker_army_events = borrow_global_mut<SpiderArmyEvents>(attacker);
    event::emit(AttackEvent{
      attacker,
      defender,
    })
    while (smart_vector::length(&defender_army.spiders) > 0) {
      smart_vector::pop_back(&mut defender_army.spiders);
    };
  }

  // inline 함수는 리소스와 서명자 참조 반환하고 매크로를 인자로 받을 수 있다.
  // inline 함수는 함수 호출 오버헤드를 줄이기 위해 사용된다.
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


/* vector 함수 예시
public fun double_up() {
    let original = vector[1, 2, 3];
    let doubled = vector::map(original, |element| element * 2);
}
*/

/*
* 트랜잭션의 gas cost 중 99%는 새로운 resource의 생성에 의해 발생한다.
* 기존 resource를 수정하는 것은 저렴하다.
* resource를 삭제하면 sender에게 일부 gas가 반환된다.
* 따라서 최대한 적은 수의 resource를 생성하고, 사용하지 않는 resource를 삭제하는 것이 중요하다.
* 하지만, 과도한 최적화는 코드를 복잡하게 만들 수 있다.
* 예를 들어, 하나의 resource에 너무 많은 필드를 추가하는 것은 좋지 않다.
* 과도한 최적화 예시:
struct TooManyFields has key {
  field_1: u64,
  field_2: u64,
  field_3: u64,
  field_4: u64,
  field_5: u64,
  field_6: u64,
  field_7: u64,
  field_8: u64,
}
* Resource Group을 사용하여 여러 resource를 하나로 묶어서 관리할 수 있다.
* Resource Group을 만들기 위해 필요한 조건:
* 1. 그룹 컨테이너처럼 동작하는 비어있는 struct가 필요하다. 이 구조체는 #[resource_group(scope = global)] 속성을 가져야한다.
* 2. 그룹에 포함될 구조체는 #[resource_group(scope = 그룹컨테이너이름)] 속성을 가져야한다.
* 3. 각 그룹 멤버를 생성, 읽기, 또는 쓰기 작업을 할 때, 특정 리소스 멤버들에 대해서 move_from, borrow_global, borrow_global_mut을 사용할 수 있다.
#[resource_group(scope = global)]
struct MyGroup {}

#[resource_group_member(group = MyGroup)]
struct TooManyFields1 has key {
    field_1: u64,
    field_2: u64,
    field_3: u64,
    field_4: u64,
}

#[resource_group_member(group = MyGroup)]
struct TooManyFields2 has key {
    field_5: u64,
    field_6: u64,
    field_7: u64,
    field_8: u64,
}

fun example() {
    move_to(@0xcafe, TooManyFields1 {
        field_1: 1,
        field_2: 2,
        field_3: 3,
        field_4: 4,
    });
    borrow_global<TooManyFields1>(@0xcafe).field_1;
    borrow_global_mut<TooManyFields2>(@0xcafe).field_5 = 5;
}
*/
