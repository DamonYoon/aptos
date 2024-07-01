// <address>::<module_name>
// module 이름은 snake_case로 작성한다.
module 0xcafe::spider_nest {
  // use 구문을 통해 다른 모듈을 가져올 수 있다.
  use std::vector; 
  // event를 생성하기 위해서 두 개의 모듈을 가져온다. (account, event)
  use aptos_framework::account;
  use aptos_framework::event;

  // `key` 속성을 부여한 struct는 `Resources`라는 global storage에 저장된다.
  // 각 Resource는 특정 address에 저장되며, 모듈이 배포된 address뿐만 아니라 다른 address에도 저장될 수 있다.
  struct SpiderDna has key {
      dna_digits: u64,
      dna_modulus: u256,
  }

  // store 속성을 가진 struct는 global storage에 저장될 수 있다. 그러나 global storage operation이 없기 때문에 직접적으로 저장할 수는 없다.
  struct Spider has store {
    dna: u64,
  }

  // key 속성을 가진 struct는 내부 필드가 모두 store 속성을 가져야 한다. 따라서 store 속성을 가진 struct를 내부 필드로 포함할 수 있다.
  struct SpiderSwarm has key {
    spiders: vector<Spider>,
  }

  // event struct는 [#event]로 선언한다.
  // event는 모듈의 상태 변화를 추적하기 위해 사용된다.
  // 모든 event struct는 drop, store을 가져야 한다.
  [#event]
  struct SpiderSwarmEvent has drop, store {
    dna: u64,
  }

  // init_module은 모듈이 배포되는 시점에 단 한 번만 호출되는 함수이다.
  fun init_module(cafe_signer: &signer) {
    let dna_digits = 10;
    let dna_modulus = 10 ^ dna_digits; // 여기서 dna_modulus 타입: u64

    // `move_to`: Resource를 저장하는 함수로, signer를 필요로 한다.
    move_to(cafe_signer, SpiderDna { 
      dna_digits, 
      dna_modulus: (dna_modulus as u256), // u64를 u256로 변환
    });

    move_to(cafe_signer, SpiderSwarm { 
      spiders: vector[],
    });
  }

  // public 함수는 외부 모듈에서 호출할 수 있는 함수이다.
  // 따라서 누구든 호출할 수 있는 함수만 public으로 선언해야 한다. 그 외의 함수는 public을 없이 선언한다.(private 함수)
  fun spawn_spider(dna: u64) acquires SpiderSwarm {
    let spider = Spider {
      dna,
    };

    let spider_swarm = borrow_global_mut<SpiderSwarm>(@0xcafe);
    // vector::push_back(&mut vector, new_element) 함수를 사용하여 vector에 요소를 추가할 수 있다.
    vector::push_back(&mut spider_swarm.spiders, spider);

    // event::emit 함수를 사용하여 event를 발생시킬 수 있다.
    event::emit(SpiderSwarmEvent { 
      dna,
    });
  }

  // 리소스를 접근하려면 acquires 키워드를 사용해야 한다.
  // borrow_global 함수는 global storage에 저장된 리소스를 가져온다. 이때 리소스의 타입과 address를 인자로 받는다.
  public fun get_dna_digits(): u64 acquires SpiderDna {
    borrow_global<SpiderDna>(@0xcafe).dna_digits
  }

  // borrow_global_mut 함수는 global storage에 저장된 리소스를 수정할 수 있다.
  // address가 expression으로 사용되는 경우에는 @를 address 앞에 붙여야 한다.
  public fun set_dna_digits(new_dna_digits: u64) acquires SpiderDna {
    let spider_dna = borrow_global_mut<SpiderDna>(@0xcafe);
    spider_dna.dna_digits = new_dna_digits;
  }

  // vector::borrow(vector, index) 함수를 사용하여 vector의 요소를 가져올 수 있다.
  public fun get_first_spider_dna(): u64 acquires SpiderSwarm {
    let spider_swarm = borrow_global<SpiderSwarm>(@0xcafe);
    let first_spider = vector::borrow(&spider_swarm.spiders, 0);
    first_spider.dna
  }
}
