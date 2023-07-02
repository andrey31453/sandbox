<?php

interface people
{
	public $name;
	public $age;
	public $job;
}

class Person implements people
{
	public $name;
	public $age;

	function __construct($name, $age)
	{
		$this->name = $name;
		$this->age = $age;
	}
}

class Manager extends Person
{
	public static $job;

	function __construct($name, $age)
	{
		parent::__construct($name, $age);
		self::$job = __CLASS__;
	}

	public function get_job()
	{
		return self::$job;
	}
}

$user_145 = new Manager('vasya', 20);
print_r($user_145);
print_r($user_145->get_job());
